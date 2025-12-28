import type { VideoSet } from 'types/index';

// Scene definition for background video selection
export interface Scene {
  id: string;
  name: string;
  thumbnail: string;
  videos: VideoSet | null; // null = coming soon (no video available)
}

// Available scenes - only Exterior and Cafe have videos
export const scenes: Scene[] = [
  {
    id: 'exterior',
    name: 'Exterior',
    thumbnail: './assets/img/changeset/exterior.png',
    videos: {
      day: './assets/video/ExteriorDay.mp4',
      rainyDay: './assets/video/ExteriorRainyDay.mp4',
      night: './assets/video/ExteriorNight.mp4',
      rainyNight: './assets/video/ExteriorRainyNight.mp4',
    },
  },
  {
    id: 'cafe',
    name: 'Book Cafe',
    thumbnail: './assets/img/changeset/bookcafe.png',
    videos: {
      day: './assets/video/CafeDay.mp4',
      rainyDay: './assets/video/CafeRainyDay.mp4',
      night: './assets/video/CafeNight.mp4',
      rainyNight: './assets/video/CafeRainyNight.mp4',
    },
  },
  {
    id: 'dreamin',
    name: 'Dreamin',
    thumbnail: './assets/img/changeset/dreamin.png',
    videos: null,
  },
  {
    id: 'chill',
    name: 'Chill Vibes',
    thumbnail: './assets/img/changeset/chill.png',
    videos: null,
  },
  {
    id: 'cottage',
    name: 'Cottage',
    thumbnail: './assets/img/changeset/cottage.png',
    videos: null,
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    thumbnail: './assets/img/changeset/kyoto.png',
    videos: null,
  },
  {
    id: 'lofidesk',
    name: 'Lofi Desk',
    thumbnail: './assets/img/changeset/lofidesk.png',
    videos: null,
  },
];

// Default scene and videos
export const DEFAULT_SCENE_ID = 'exterior';
export const DEFAULT_VIDEOS: VideoSet = scenes[0].videos as VideoSet;

// Helper to find scene by id
export const findSceneById = (id: string): Scene | undefined =>
  scenes.find(scene => scene.id === id);
