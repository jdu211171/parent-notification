import React from 'react';
import {useStorageState} from "@/hooks/useStorageState";
import {router} from "expo-router";

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => new Promise(() => null),
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (email: string, password: string) =>
            fetch('https://e45np4n3jb.execute-api.ap-northeast-1.amazonaws.com/mock/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.error) {
                  throw new Error(data.error);
                }
                // console.log(data)
                setSession(JSON.stringify(data));
                router.replace('/')
              })

        ,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
