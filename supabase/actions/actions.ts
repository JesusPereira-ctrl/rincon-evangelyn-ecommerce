'use server';

import { createClient } from '@/supabase/libs/server';
import { redirect } from 'next/navigation';

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: traducirErrorSupabase(error.message) };
  }

  redirect('/admin/dashboard');
}

function traducirErrorSupabase(message: string): string {
  switch (message) {
    case 'Invalid login credentials':
      return 'Correo o contraseña incorrectos';
    case 'Email not confirmed':
      return 'Debes confirmar tu correo antes de ingresar';
    default:
      return 'Ocurrió un error al iniciar sesión. Intenta de nuevo.';
  }
}

export const uploadProductImageToSupabase = async (file: File) => {
  const supabase = await createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error subiendo imagen:', error);
    throw new Error('IMAGE_UPLOAD_FAILED');
  }

  const { data: publicUrlData } = supabase.storage
    .from('product-images')
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};

export const deleteProductImageFromSupabase = async (
  imageUrl: string,
): Promise<void> => {
  try {
    const supabase = await createClient();

    const urlParts = imageUrl.split('/storage/v1/object/public/');
    if (urlParts.length < 2) {
      console.warn(
        'URL de imagen con formato inesperado, no se pudo parsear:',
        imageUrl,
      );
      return;
    }

    const [bucket, ...pathSegments] = urlParts[1].split('/');
    const filePath = pathSegments.join('/');

    console.log('bucket:', bucket);
    console.log('filePath:', filePath);

    if (!bucket || !filePath) {
      console.warn('No se pudo extraer bucket o ruta del archivo:', imageUrl);
      return;
    }

    const { data, error } = await supabase.storage
      .from('product-images')
      .remove([filePath]);

    console.log('data:', data); // 👈 agregado
    console.log('error:', error); // 👈 agregado — este es el clave

    if (error) {
      console.error(
        'Error al borrar archivo físico de Supabase:',
        error.message,
      );
    }
  } catch (error) {
    console.error('Error inesperado en deleteProductImageFromSupabase:', error);
  }
};
