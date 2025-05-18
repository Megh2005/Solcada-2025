# Solcada-2025

**Solcada-2025** is a modern, scalable web application built with Next.js and TypeScript. It leverages Tailwind CSS for styling and incorporates a modular architecture to facilitate maintainability and scalability.

## ✨ Features

* **Next.js & TypeScript**: Harnessing the power of Next.js for server-side rendering and TypeScript for type safety.
* **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
* **Modular Architecture**: Organized codebase with clear separation of concerns.
* **Custom Components**: Reusable and customizable UI components.
* **Mermaid Integration**: Visualize workflows and diagrams using Mermaid.

## 📁 Project Structure

```
├── app/                # Application pages and routing
├── components/         # Reusable UI components
├── lib/                # Utility functions and libraries
├── types/              # TypeScript type definitions
├── public/             # Static assets
├── styles/             # Global styles and Tailwind configurations
├── .eslintrc.json      # ESLint configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Project metadata and scripts
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── story.mermaid       # Mermaid diagrams
```

## 🛠️ Installation

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or later)
* [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Megh2005/Solcada-2025.git
   cd Solcada-2025
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Run the Development Server**

   Using npm:

   ```bash
   npm run dev
   ```

   Or using Yarn:

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📦 Dependencies

### Runtime Dependencies

* **[Next.js](https://nextjs.org/)**: React framework for production.
* **[React](https://reactjs.org/)**: JavaScript library for building user interfaces.
* **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework.

### Development Dependencies

* **[TypeScript](https://www.typescriptlang.org/)**: Typed superset of JavaScript.
* **[ESLint](https://eslint.org/)**: Linting utility for JavaScript and TypeScript.
* **[Prettier](https://prettier.io/)**: Code formatter.
* **[PostCSS](https://postcss.org/)**: Tool for transforming CSS with JavaScript.
* **[Autoprefixer](https://github.com/postcss/autoprefixer)**: PostCSS plugin to parse CSS and add vendor prefixes.

For a complete list, refer to the `package.json` file.

## 📄 Scripts

* `dev`: Runs the application in development mode.
* `build`: Builds the application for production.
* `start`: Starts the production server.

## 📊 Mermaid Diagrams

The `story.mermaid` file contains Mermaid syntax diagrams to visualize workflows and processes. You can render these diagrams using the [Mermaid Live Editor](https://mermaid.live/) or integrate them into your documentation.
