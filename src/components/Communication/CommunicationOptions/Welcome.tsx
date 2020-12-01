export const WELCOME_MESSAGE = {
  title: `Welcome to {{appName}}! We’re glad you’re here.`,
  desc: `{{appName}} is your tool to create, take, and manage polls.`,
  actions: {
    primary: {
      label: "Sign In",
      action: () => alert("Sign In action called"),
    },
    secondary: {
      label: "Sign Up",
      action: () => alert("Sign Up action called"),
    },
    tertiary: {
      label: "Learn more about {{appName}}",
      action: () => alert("Learn more action called"),
    },
  },
};
