import { supabase } from "../supabase/supabaseClient";

export async function signInAdmin(email: string, password: string) {
  console.log("Attempting to sign in with:", email);

  const { data: authData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  console.log("Auth response:", { authData, loginError });

  if (loginError || !authData.user) {
    console.log("Login failed:", loginError);
    return { error: "Invalid email or password" };
  }

  console.log("Checking profile for user:", authData.user.id);

  try {
    const { data, error: profileError } = await supabase
      .from("profiles")
      .select()
      .eq("id", authData.user.id)
      .limit(1);

    console.log("Raw profile response:", { data, profileError });

    if (profileError) {
      console.error("Profile error:", profileError);
      await supabase.auth.signOut();
      return { error: "Profile not found" };
    }

    const profile = data?.[0];
    if (!profile || profile.role !== "admin") {
      console.log("User is not an admin. Role:", profile?.role);
      await supabase.auth.signOut();
      return { error: "You are not authorized as admin" };
    }

    return { user: authData.user };
  } catch (error) {
    console.error("Unexpected error checking profile:", error);
    await supabase.auth.signOut();
    return { error: "An unexpected error occurred" };
  }
}
