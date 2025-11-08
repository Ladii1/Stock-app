'use server'
import { auth } from '@/lib/better-auth/auth';
import { inngest } from '../inngest/client';
import { headers } from 'next/headers';


export const signUpWithEmail = async({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {email, password, name: fullName}
        })

        if (response) {
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email,
                    name: fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry
                }
            })
        }
        return {success: true, message: 'Sign up successful! Please check your email to verify your account.'};
    } catch (error) {
        console.error('Error during sign up:', error);
        return { success: false, message: 'An error occurred during sign up. Please try again later.' };
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({headers: await headers()});
    } catch (error) {
        console.error('Error during sign out:', error);
        return { success: false, message: 'An error occurred during sign out. Please try again later.' };
    }
}

export const signInWithEmail = async({ email, password}: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({
            body: {email, password}
        })

        return {success: true, message: 'Sign in successful! Welcome back.'};
    } catch (error) {
        console.error('Error during Sign In:', error);
        return { success: false, message: 'An error occurred during Sign In. Please try again later.' };
    }
}