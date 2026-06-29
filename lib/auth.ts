import supabase from "./supabase/supabse";

export const signUp = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return data;

    } catch (error) {
        console.error(error);
        return null;
    }

}

export const signIn = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getUser = async () => {
    try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const signUpWithPhone = async (phone: string,password: string) => {
    try {
        const { data, error } = await supabase.auth.signUp({ phone ,password});
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const signInWithPhone = async (phone: string,password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ phone, password });
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const signInWithOTP = async (phone: string,otp: string) => {
    try {
        const { data, error } = await supabase.auth.verifyOtp({ phone, token: otp ,type:"sms"});
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}