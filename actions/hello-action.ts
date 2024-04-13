'use server';

export const helloAction = async (name: string) => {
  return { message: `Thank you ${name} for your inquiry. We will get back to you within 24 hours.` };
};
