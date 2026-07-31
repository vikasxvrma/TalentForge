import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  generatePresignedUpload,
  processResume,
} from "../api/resumeApi";
import { uploadToS3 } from "../service/uploadToS3";

export function useUploadResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      const { uploadUrl, key } = await generatePresignedUpload();

      await uploadToS3({
        uploadUrl,
        file,
      });

      return processResume({
        objectKey: key,
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
      });
    },

    onSuccess: (resume) => {
      // Immediately update the cache with the newly created resume.
      queryClient.setQueryData(["resume"], resume);

      // Then refetch in the background to stay in sync.
      queryClient.invalidateQueries({
        queryKey: ["resume"],
      });
    },
  });
}