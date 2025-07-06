export function BaseLayout({ title, body }: { title: string; body: string }) {
  return /* html */ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
          body {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            background: #f9f9f9;
          }
          header {
            background: #2d2d2d;
            color: white;
            padding: 1rem;
            text-align: center;
          }
          nav {
            background: #444;
            padding: 0.5rem;
            text-align: center;
          }
          nav a {
            color: #fff;
            margin: 0 1rem;
            text-decoration: none;
          }
          main {
            padding: 2rem;
          }
          footer {
            background: #2d2d2d;
            color: white;
            text-align: center;
            padding: 1rem;
            position: fixed;
            bottom: 0;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>${title}</h1>
        </header>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
        <main>
          ${body}
        </main>
        <footer>
          <p>&copy; 2025 DeveloperPA</p>
        </footer>
      </body>
    </html>
  `;
}
