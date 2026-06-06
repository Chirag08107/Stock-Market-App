'use server';

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";

export const signUpWithEmail = async ({email,password,fullName,investmentGoals,preferredIndustry,country,riskTolerance}: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {email,password, name: fullName}
        })

        if (response) {
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email,
                    name: fullName,
                    country,
                    investmentGoals,
                    preferredIndustry,
                    riskTolerance
                }
            })
        }

        return { success: true, data: response };
    } catch (e) {
        console.log('Sign up failed', e);
        return { success: false, error: 'Sign Up failed'}
    }

}

export const signInWithEmail = async ({email,password}: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({
            body: { email, password },
            headers: await headers(),
        })

        return { success: true, data: response };
    } catch (e) {
        console.log('Sign in failed', e);
        throw new Error(e instanceof Error ? e.message : 'Sign In failed');
    }

}

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() });
    } catch (e) {
        console.log('Sign out failed', e);
        return {success: false, error: 'Sign out failed'}
    }
}