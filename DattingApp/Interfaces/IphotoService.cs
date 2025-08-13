using System;
using CloudinaryDotNet.Actions;

namespace DattingApp.Interfaces;

public interface IphotoService
{
    Task<ImageUploadResult> UploadPhotoAsync(IFormFile file);
    Task<DeletionResult> DeletePhotoAsync(string publicId);
}
