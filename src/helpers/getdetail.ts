import { getSession } from 'next-auth/react';

export async function getServerSideProps(context:any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  // Access session data
  const userRole = session.user.role;
  const isVerified = session.user.isVerified;
    const username = session.user.username;
  return {
      props: {
    username,
      userRole,
      isVerified,
    },
  };
}
