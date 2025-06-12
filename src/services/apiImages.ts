import { supabase } from '../supabase/supabaseClient';

// Types
export interface Image {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_path: string;
  created_at: string;
}

// Read Operations
export const getAllImages = async () => {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Image[];
};

export const getImagesByCategory = async (category: string) => {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Image[];
};

export const getImageById = async (id: string) => {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Image;
};

// Create Operations
export const createImage = async (imageData: Omit<Image, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('images')
    .insert([imageData])
    .select()
    .single();
  
  if (error) throw error;
  return data as Image;
};

export const createManyImages = async (imagesData: Omit<Image, 'id' | 'created_at'>[]) => {
  const { data, error } = await supabase
    .from('images')
    .insert(imagesData)
    .select();
  
  if (error) throw error;
  return data as Image[];
};

// Update Operations
export const updateImage = async (id: string, updates: Partial<Omit<Image, 'id' | 'created_at'>>) => {
  const { data, error } = await supabase
    .from('images')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Image;
};

// Delete Operations
export const deleteImage = async (id: string) => {
  const { error } = await supabase
    .from('images')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Filtering Operations
export const filterImages = async (filters: {
  category?: string;
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
}) => {
  let query = supabase
    .from('images')
    .select('*');

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.searchTerm) {
    query = query.or(`title.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
  }

  if (filters.startDate) {
    query = query.gte('created_at', filters.startDate);
  }

  if (filters.endDate) {
    query = query.lte('created_at', filters.endDate);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Image[];
};

// Pagination Operations
export const getPaginatedImages = async (page: number, pageSize: number) => {
  const start = page * pageSize;
  const end = start + pageSize - 1;

  const { data, error } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false })
    .range(start, end);
  
  if (error) throw error;
  return data as Image[];
};

// Realtime Subscriptions
export const subscribeToImages = (callback: (payload: any) => void) => {
  return supabase
    .channel('images-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'images' },
      callback
    )
    .subscribe();
};

export const subscribeToImageInserts = (callback: (payload: any) => void) => {
  return supabase
    .channel('images-inserts')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'images' },
      callback
    )
    .subscribe();
};

export const subscribeToImageUpdates = (callback: (payload: any) => void) => {
  return supabase
    .channel('images-updates')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'images' },
      callback
    )
    .subscribe();
};

export const subscribeToImageDeletes = (callback: (payload: any) => void) => {
  return supabase
    .channel('images-deletes')
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'images' },
      callback
    )
    .subscribe();
};

export const subscribeToSpecificImage = (imageId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`image-${imageId}`)
    .on(
      'postgres_changes',
      { 
        event: '*', 
        schema: 'public', 
        table: 'images', 
        filter: `id=eq.${imageId}` 
      },
      callback
    )
    .subscribe();
};
