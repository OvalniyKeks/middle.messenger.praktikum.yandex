// import withStore

// interface User {
//   id: number;
//   first_name: string;
//   second_name: string;
//   login: string;
//   email: string;
//   password: string;
//   phone: string;
//   avatar: string;
// }

// export interface PropsWithUser extends User {
//   isLoading?: boolean,
//   error?: string
// }

// const withUser = withStore((state) => {
//   const userData = { ...state.user?.data } as PropsWithUser;
//   userData.isLoading = state.user?.isLoading;
//   userData.error = state.user?.error;
//   return userData;
// });

// export default withUser;
