import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

actor UserRegistry {

    type Username = Text;

    type UserEntry = {
        principal : Principal;
        username : Username;
    };

    let userEntries = HashMap.HashMap<Principal, UserEntry>(10, Principal.equal, Principal.hash);

    public shared ({ caller }) func deleteUsername() : async Bool {
        let result = userEntries.remove(caller);
        return result != null;
    };

    public shared ({ caller }) func registerUsername(username : Text) : async Bool {
        let currentUser : UserEntry = {
            principal = caller;
            username = username;
        };

        if (userEntries.get(caller) != null) {
            Debug.print("Usuario ya ha registrado un nombre: " # username);
            return false;
        };
        userEntries.put(caller, currentUser);
        Debug.print("Nuevo nombre de usuario registrado: " # username);
        return true;
    };

    public query func getUsernameByPrincipal(principal : Principal) : async ?Username {
        switch (userEntries.get(principal)) {
            case (null) { return null };
            case (?userEntry) { return ?userEntry.username };
        };
    };
};
