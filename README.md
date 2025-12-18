# Cygne Noir Cyber Blog

A modern cybersecurity blog built with React and Tailwind CSS, featuring AI & cybersecurity insights, threat analysis, and expert content.

## 🚀 Features

- **Modern Design**: Clean, professional interface with gradient effects
- **Responsive Layout**: Optimized for all devices
- **Search Functionality**: Find articles quickly with real-time search
- **Category Filtering**: Browse content by security topics
- **Latest Articles**: Featured latest cybersecurity insights
- **Sanity CMS Integration**: Content management with fallback to sample data

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io (optional)
- **Build Tool**: Create React App

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cygne_noir_blog.git
cd cygne_noir_blog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🔧 Configuration

### Sanity CMS (Optional)
To connect to Sanity CMS, update the configuration in `src/sanityClient.js`:

```javascript
export const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01'
});
```

## 📁 Project Structure

```
src/
├── components/
│   └── Navbar.jsx          # Navigation component
├── pages/
│   ├── Home.jsx            # Homepage
│   ├── SimpleBlogList.jsx  # Blog listing page
│   └── SimpleBlogDetails.jsx # Individual blog post
├── sanityClient.js         # Sanity CMS configuration
├── App.js                  # Main app component
└── index.js               # Entry point
```

## 🎨 Customization

### Colors
The project uses a blue-cyan gradient theme. To customize colors, update the Tailwind classes:
- Primary: `blue-600` to `cyan-600`
- Secondary: `gray-800`, `gray-900`

### Content
Sample blog posts are included in the components. To add your own content:
1. Update the `samplePosts` array in `SimpleBlogList.jsx`
2. Or connect to Sanity CMS for dynamic content management

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

### Deploy to popular platforms:
- **Netlify**: Connect your GitHub repo and deploy automatically
- **Vercel**: Import your GitHub repo for instant deployment
- **GitHub Pages**: Use `gh-pages` package for deployment

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/cygne_noir_blog/issues).

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for the cybersecurity community**