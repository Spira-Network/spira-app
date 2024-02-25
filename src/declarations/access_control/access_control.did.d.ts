import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Error = { 'NotFound' : null };
export interface Profile { 'userName' : string, 'principal' : Principal }
export type Result = { 'ok' : Profile } |
  { 'err' : Error };
export interface _SERVICE {
  'getCounts' : ActorMethod<[], string>,
  'getProfiles' : ActorMethod<[], string>,
  'increment' : ActorMethod<[], bigint>,
  'myCount' : ActorMethod<[], bigint>,
  'myProfile' : ActorMethod<[], Result>,
  'setProfile' : ActorMethod<[string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
