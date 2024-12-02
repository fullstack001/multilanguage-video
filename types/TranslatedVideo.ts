export type TranslatedVideo = {
  video_translate_id: string;
  title: string;
  output_language: string;
  status: string;
  url: string;
  message: string | null;
  callback_id: string;
};
