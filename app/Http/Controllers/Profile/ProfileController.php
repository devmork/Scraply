<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class ProfileController extends Controller
{
   
    public function show(): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }

   
    public function update(Request $request): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Validate incoming data
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                'string',
                'min:2',
                'max:255',
            ],
            'email' => [
                'required',
                'email:rfc,dns',
                'unique:users,email,' . $user->id,
            ],
            'phone' => [
                'required',
                'string',
                'regex:/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/',
            ],
            'avatar' => [
                'nullable',
                File::image()
                    ->extensions(['jpg', 'jpeg', 'png', 'webp', 'gif'])
                    ->max('5mb'),
            ],
        ], [
            'name.required' => 'Name is required',
            'name.min' => 'Name must be at least 2 characters',
            'name.max' => 'Name must not exceed 255 characters',
            'email.required' => 'Email is required',
            'email.email' => 'Invalid email format',
            'email.unique' => 'Email already in use',
            'phone.required' => 'Phone number is required',
            'phone.regex' => 'Invalid phone number format',
            'avatar.image' => 'File must be an image',
            'avatar.extensions' => 'Only JPEG, PNG, WebP, and GIF images are allowed',
            'avatar.max' => 'Image must be smaller than 5MB',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->phone = $request->input('phone');

            if ($request->hasFile('avatar')) {
                if ($user->avatar_url) {
                    Storage::disk('public')->delete($user->avatar_url);
                }

                $avatarPath = $request->file('avatar')->store(
                    path: 'avatars',
                    options: 'public'
                );

                $user->avatar_url = $avatarPath;
            }

            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => $user,
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Profile update error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update profile',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function deleteAvatar(): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            if ($user->avatar_url) {
                Storage::disk('public')->delete($user->avatar_url);
                $user->avatar_url = null;
                $user->save();
            }

            return response()->json([
                'success' => true,
                'message' => 'Avatar deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Avatar deletion error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete avatar',
            ], 500);
        }
    }
}
