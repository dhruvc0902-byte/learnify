import bcrypt from "bcryptjs";
import { supabase } from "../supabaseClient";

// ========== SIGN UP ==========
export async function signUp(fullname, email, mobile, password) {
  const hashed = bcrypt.hashSync(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert({
      fullname,
      email,
      mobile,
      password: hashed,
      role: "user"
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// ========== SIGN IN ==========
export async function signIn(email, password) {
  // 1. Get user by email
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) throw new Error("User not found");

  // 2. Compare password
  const match = bcrypt.compareSync(password, user.password);
  if (!match) throw new Error("Invalid password");

  return user;
}

// ========== UPDATE PROFILE ==========
export async function updateProfile(id, fullname, password) {
  const updateData = { fullname };

  if (password) {
    updateData.password = bcrypt.hashSync(password, 10);
  }

  const { data, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
