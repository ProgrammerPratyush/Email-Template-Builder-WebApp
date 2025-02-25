# Email Template Builder & Editor📧
### By Pratyush Puri Goswami

## Overview

The Email Template Builder is a powerful web application that allows users to create, manage, and export email templates with ease. Built with modern web technologies, it provides a user-friendly interface for designing professional email templates and directly exporting them to email service providers.

## Features

### 1. Template Management
- **Pre-built Templates**: Access a variety of professional email templates across different categories:
  - Business Invitations
  - Newsletters
  - Product Launches
  - Welcome Emails
  - Event Announcements
  - Thank You Messages
  - Feedback Requests
  - Holiday Specials
  - Company Updates
  - Promotional Offers

- **Template Library**: 
  - Save custom templates
  - Delete unwanted templates
  - Preview templates before use
  - Organize templates by category

### 2. Template Editor
- **Rich Text Editor**: Powered by ReactQuill with features like:
  - Text formatting (bold, italic, underline)
  - Lists (ordered and unordered)
  - Color customization
  - Image insertion
  - Link creation

- **Email Compatibility Checker**:
  - Real-time compatibility checking for Gmail and Outlook
  - Visual indicators for potential compatibility issues
  - Suggestions for improving compatibility

### 3. Export Capabilities
- **Gmail Integration**:
  - Direct export to Gmail drafts
  - Secure OAuth2 authentication
  - Maintains template formatting
- **Download Options**:
  - Export as HTML files
  - Preserve all styling and formatting

## Technical Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Rich Text Editor**: React Quill
- **Authentication**: Google OAuth 2.0
- **State Management**: React Query
- **Icons**: Lucide React

## Getting Started

1. **Clone the Repository**
```bash
git clone <repository-url>
cd email-template-builder
```

2. **Install Dependencies**
```bash
npm install
```

3. **Set Up Environment Variables**
Create a `.env` file in the root directory:
```env
VITE_GMAIL_CLIENT_ID=your_client_id
VITE_GMAIL_CLIENT_SECRET=your_client_secret
```

4. **Run the Development Server**
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
│   ├── Home.tsx        # Landing page
│   ├── Templates.tsx   # Pre-built templates
│   ├── Library.tsx     # Saved templates
│   └── Editor.tsx      # Template editor
├── utils/              # Utility functions
│   └── gmailAuth.ts    # Gmail authentication
└── hooks/              # Custom React hooks
```

## Key Features Implementation

### Gmail Integration
The application uses Google OAuth 2.0 for secure Gmail integration:
1. User clicks "Export to Gmail"
2. OAuth consent screen appears
3. User authorizes the application
4. Template is saved to Gmail drafts

### Email Compatibility
Templates are automatically checked for:
- Inline styles
- Complex selectors
- Web fonts
- Media queries

### Template Management
Templates are stored locally with:
- Unique identifiers
- Creation timestamps
- Compatibility information
- Content preservation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React Quill](https://github.com/zenoamaro/react-quill) for the rich text editor
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Google Gmail API](https://developers.google.com/gmail/api) for email integration

## Support

Your support is highly appreciated.
