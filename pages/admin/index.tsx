// pages/admin/index.tsx
// for `npm run dev`

import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";

interface NetlifyIdentity {
    on: (event: string, callback: (user: any) => void) => void; // Update here
    // Add other properties and methods as needed
}

declare global {
    interface Window {
        netlifyIdentity: NetlifyIdentity;
    }
}

const CMSPage: React.FC = () => {
    useEffect(() => {
        // Initialize Netlify Identity
        if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", (user) => {
                if (!user) {
                    window.netlifyIdentity.on("login", () => {
                        document.location.href = "/admin/";
                    });
                }
            });
        }

        // Dynamically add the decap-cms script in the body
        // const script = document.createElement("script");
        // script.src = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";
        // script.async = true;
        // document.body.appendChild(script);

        // return () => {
        //   document.body.removeChild(script);
        // };
    }, []);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="noindex" />
                <title>Content Manager</title>
                <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
            </Head>
            <Script
                src="https://identity.netlify.com/v1/netlify-identity-widget.js"
                async
            />
            <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" async></Script>
            <main id="cms" />
        </>
    );

};

export default CMSPage;
