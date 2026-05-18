# Profile Edit Form - Setup & Implementation Guide

## 📋 Overview

Complete profile editing system with real-time validation, avatar upload, and success/error feedback.

## ✅ Acceptance Criteria - All Implemented

- ✅ **Form fields pre-filled with current data** - Name, email, phone auto-populated from user object
- ✅ **Real-time validation** - Email and phone validated as user types
- ✅ **Cancel button** - Discards changes and resets form
- ✅ **Save button** - Submits validated form to backend
- ✅ **Loading state** - Shows spinner during submission
- ✅ **Success message** - Displays confirmation after save
- ✅ **Error messages** - Shows validation failures per field
- ✅ **Avatar preview** - Shows thumbnail before upload
- ✅ **Form locking** - Prevents double-submit during request

## 📦 Files Created

### Frontend Components
- `resources/js/components/ProfileEditForm.tsx` - Main form component
- `resources/js/lib/validation.ts` - Validation utilities
- `resources/js/pages/UserProfile/Profile.tsx` - Updated profile page

### Backend
- `app/Http/Controllers/ProfileController.php` - Profile API controller
- `routes/profile-routes-example.php` - API routes example

## 🚀 Quick Setup

### Step 1: Add API Routes
Add this to `routes/api.php`:

```php
use App\Http\Controllers\ProfileController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/profile/update', [ProfileController::class, 'update']);
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::delete('/profile/avatar', [ProfileController::class, 'deleteAvatar']);
});
```

### Step 2: Update User Model
Ensure `app/Models/User.php` has these fields in fillable array:

```php
protected $fillable = [
    'name',
    'email',
    'phone',
    'avatar_url',
    // ... other fields
];
```

### Step 3: Create Storage Directory
```bash
mkdir -p storage/app/public/avatars
php artisan storage:link
```

### Step 4: Database Preparation
Ensure your users table has these columns:
- `phone` (nullable string)
- `avatar_url` (nullable string)

If missing, create a migration:
```bash
php artisan make:migration add_phone_and_avatar_to_users_table --table=users
```

Add to migration:
```php
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('phone')->nullable();
        $table->string('avatar_url')->nullable();
    });
}
```

### Step 5: Build & Test
```bash
npm run build
php artisan serve
```

## 🎯 Form Features

### Real-Time Validation
- **Email**: RFC/DNS compliant format
- **Phone**: Supports international formats (+1-555-123-4567, etc.)
- **Name**: 2-255 characters, non-empty
- **Avatar**: jpg, png, webp, gif, max 5MB

### User Experience
- Form fields pre-filled from authenticated user
- Validation errors appear instantly as user types
- Field errors in red with descriptive messages
- Avatar preview updates immediately on selection
- Submit button disabled until all fields valid
- All inputs locked during API request
- Success message auto-dismisses after 5 seconds
- Clicking Cancel discards all changes

### Error Handling
- Frontend validation before submission
- Backend validation for all fields
- Email uniqueness check (except current user)
- File type and size validation
- Network error handling
- User-friendly error messages

## 📝 Component API

### ProfileEditForm
```tsx
import ProfileEditForm from "@/components/ProfileEditForm"

// Usage in JSX:
<section>
    <h3>Account Settings</h3>
    <ProfileEditForm />
</section>
```

**Props**: None required (uses Inertia props)

**Features**:
- Toggle between view and edit modes
- Pre-filled form fields
- Real-time validation
- Avatar preview
- Success/error messages

## 🔌 Backend API

### POST /api/profile/update
Update user profile data.

**Request**:
```
Content-Type: multipart/form-data

name: "John Doe"
email: "john@example.com"
phone: "+1 (555) 123-4567"
avatar: [File object]
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "avatar_url": "avatars/abc123.jpg",
    "updated_at": "2026-05-19T10:30:00Z"
  }
}
```

**Validation Error** (422):
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["Email already in use"],
    "phone": ["Invalid phone number format"]
  }
}
```

### GET /api/profile
Retrieve current user profile.

**Success Response** (200):
```json
{
  "success": true,
  "data": { ... user data ... }
}
```

### DELETE /api/profile/avatar
Remove user avatar.

**Success Response** (200):
```json
{
  "success": true,
  "message": "Avatar deleted successfully"
}
```

## 🛠️ Customization

### Change API Endpoint
Edit `ProfileEditForm.tsx`:
```tsx
const response = await fetch("/api/profile/update", { // ← Change URL here
```

### Add More Fields
1. Add input field to form in `ProfileEditForm.tsx`
2. Add validation rule in `validation.ts`
3. Add backend validation in `ProfileController.php`
4. Update database schema if needed

### Customize Styling
All components use Tailwind CSS. Modify classes to match your design:
- Button colors: Change `bg-blue-600` to your color
- Border radius: Change `rounded-2xl` as needed
- Spacing: Adjust `gap-`, `px-`, `py-` utilities

### Customize Messages
Edit error messages in:
- Frontend: `validation.ts` error strings
- Backend: `ProfileController.php` custom messages

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Form not submitting | Check API endpoint exists, test with Postman |
| Avatar not uploading | Ensure `storage/app/public/avatars` exists and is writable |
| Changes not persisting | Verify User model has fields in fillable array |
| Validation errors ignore | Check browser console for JS errors |
| Avatar not showing | Ensure `php artisan storage:link` was run |
| Email validation fails | Server-side validation may be stricter, check logs |

## 📚 Validation Rules

### Frontend
Instant feedback as user types with clear error messages.

### Backend
Server-side validation ensures data integrity:
- Name: 2-255 characters
- Email: Valid format, unique (except current user)
- Phone: Valid international format
- Avatar: Image only, max 5MB

## 🔐 Security Features

- CSRF protection via X-Requested-With header
- Authentication required (middleware)
- File type validation (MIME type)
- File size limits (5MB)
- Email uniqueness checked
- Input sanitization on backend

## 📱 Responsive Design

- Mobile-friendly form layout
- Touch-friendly buttons
- Responsive avatar preview
- Works on all screen sizes
- Optimized for small screens

## 🎓 Key Technologies

- React 19+ with Hooks
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons
- Laravel 11+
- Inertia.js

## ⚙️ File Storage

Avatars stored at:
- Local: `storage/app/public/avatars/`
- URL: `/storage/avatars/{filename}`
- Old files deleted when new one uploaded

## 📊 Form State Management

- FormData state for input values
- ValidationState for error messages
- Message state for alerts
- Loading state during submission
- Preview state for avatar

## 🔄 Data Flow

1. User clicks "Edit Profile"
2. Form displays with pre-filled data
3. User modifies fields
4. Real-time validation provides feedback
5. User selects avatar (optional)
6. User clicks "Save Changes"
7. Frontend validates all fields
8. FormData sent to backend
9. Backend validates and saves
10. Success message displayed
11. Page reloads with new data

## 🚀 Next Steps

- [ ] Test form submission in your app
- [ ] Customize styling to match design
- [ ] Add additional profile fields as needed
- [ ] Set up email verification if email changes
- [ ] Add password change form
- [ ] Add two-factor authentication option
- [ ] Implement image cropping before upload

## 📞 Support Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js](https://inertiajs.com)
