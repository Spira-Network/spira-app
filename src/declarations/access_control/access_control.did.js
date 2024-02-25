export const idlFactory = ({ IDL }) => {
  const Profile = IDL.Record({
    'userName' : IDL.Text,
    'principal' : IDL.Principal,
  });
  const Error = IDL.Variant({ 'NotFound' : IDL.Null });
  const Result = IDL.Variant({ 'ok' : Profile, 'err' : Error });
  return IDL.Service({
    'getCounts' : IDL.Func([], [IDL.Text], ['query']),
    'getProfiles' : IDL.Func([], [IDL.Text], ['query']),
    'increment' : IDL.Func([], [IDL.Nat], []),
    'myCount' : IDL.Func([], [IDL.Nat], ['query']),
    'myProfile' : IDL.Func([], [Result], ['query']),
    'setProfile' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
