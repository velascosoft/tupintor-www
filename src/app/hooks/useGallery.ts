import { useQuery } from '@tanstack/react-query';
import { Duration } from 'luxon';
import { listImages } from '../services/gallery';

export const useListGalleryImages = () => {
    return useQuery({
        queryKey: ['images'],
        queryFn: async () => {
            return listImages();
        },
        staleTime: Duration.fromObject({ minutes: 5 }).toMillis(),
        retry: 1,
    });
}