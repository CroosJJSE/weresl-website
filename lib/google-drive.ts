import { google } from 'googleapis';

let driveClient: any = null;

function getDriveClient() {
  if (driveClient) return driveClient;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_id: process.env.GOOGLE_DRIVE_CLIENT_ID,
      client_secret: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
      // For service account, you'd use private_key instead
    },
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  driveClient = google.drive({ version: 'v3', auth });
  return driveClient;
}

export async function listFilesInFolder(folderId: string): Promise<any[]> {
  try {
    const drive = getDriveClient();
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType, webViewLink, thumbnailLink)',
      orderBy: 'name',
    });
    return response.data.files || [];
  } catch (error) {
    console.error('Error listing Drive files:', error);
    return [];
  }
}

export function getPublicImageUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

export function getThumbnailUrl(fileId: string, size: 'small' | 'medium' | 'large' = 'large'): string {
  const sizeMap = { small: 's220', medium: 's320', large: 's800' };
  return `https://lh3.googleusercontent.com/d/${fileId}=${sizeMap[size]}`;
}

