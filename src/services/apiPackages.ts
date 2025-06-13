import { supabase } from "../supabase/supabaseClient";

export interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
  created_at: string;
}

export const getAllPackages = async () => {
  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return packages as Package[];
};

export const getPackageById = async (id: string) => {
  const { data: package_, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return package_ as Package;
};

export const createPackage = async (
  packageData: Omit<Package, "id" | "created_at">
) => {
  const { data, error } = await supabase
    .from("packages")
    .insert([packageData])
    .select()
    .single();

  if (error) throw error;
  return data as Package;
};

export const updatePackage = async (
  id: string,
  updates: Partial<Omit<Package, "id" | "created_at">>
) => {
  const { data, error } = await supabase
    .from("packages")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Package;
};

export const deletePackage = async (id: string) => {
  const { error } = await supabase.from("packages").delete().eq("id", id);

  if (error) throw error;
};

export const subscribeToPackages = (callback: (payload: any) => void) => {
  return supabase
    .channel("packages-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "packages" },
      callback
    )
    .subscribe();
};
