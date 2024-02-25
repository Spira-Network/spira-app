// src/canisters/access-control.mo
import Map "mo:map/Map";
import JSON "mo:json/JSON";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";
import Error "mo:base/Error";

// type ProfileType = {
//     #Individual;
//     #Organization;
// };

// type InterestTag = Text;

// type Profile = {
// principal : Principal;
// userName : Text;
// profileType : ProfileType;
// identity : Text;
// offerings : Text;
// needs : Text;
// location : Text;
// availability : Text;
// description : Text;
// interestTags : [InterestTag];
// following : [Principal];
// };

actor {
    type Profile = {
        principal : Principal;
        userName : Text;
    };

    type Error = {
        #NotFound;
    };

    let { phash } = Map;
    stable let counts = Map.new<Principal, Nat>();
    stable let profiles = Map.new<Principal, Profile>();

    public shared ({ caller }) func increment() : async Nat {
        let prev = switch (Map.get(counts, phash, caller)) {
            case (null) { 0 };
            case (?n) { n };
        };
        let next = prev + 1;
        Map.set(counts, phash, caller, next);

        next;
    };

    public shared query ({ caller }) func myCount() : async Nat {
        return switch (Map.get(counts, phash, caller)) {
            case (null) { 0 };
            case (?n) { n };
        };
    };

    public query func getCounts() : async Text {
        var entries = Buffer.fromArray<JSON.JSON>([]);
        for ((principal, count) in Map.entries(counts)) {
            entries.add(
                #Object([
                    ("principal", #String(Principal.toText(principal))),
                    ("count", #String(Nat.toText(count))),
                ])
            );
        };

        JSON.show(#Array(Buffer.toArray(entries)));
    };

    public shared ({ caller }) func setProfile(userName : Text) : async () {
        let profile : Profile = {
            principal = caller;
            userName = userName;
        };
        Map.set(profiles, phash, caller, profile);
    };

    // public shared query ({ caller }) func getProfile(principal : Principal) : async ?Profile {
    //     return Map.get(profiles, phash, principal);
    // };

    public shared query ({ caller }) func myProfile() : async Result.Result<Profile, Error> {
        return switch (Map.get(profiles, phash, caller)) {
            case (?Profile) { #ok(Profile) };
            case (null) { #err(#NotFound) };
        };
    };

    public query func getProfiles() : async Text {
        var entries = Buffer.fromArray<JSON.JSON>([]);
        for ((principal, profile) in Map.entries(profiles)) {
            entries.add(
                #Object([
                    ("principal", #String(Principal.toText(principal))),
                    ("userName", #String(profile.userName)),
                ])
            );
        };

        JSON.show(#Array(Buffer.toArray(entries)));
    };
};
