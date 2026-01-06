# AGENTS

<skills_system priority="1">

## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:
- Invoke: Bash("openskills read <skill-name>")
- The skill content will load with detailed instructions on how to complete the task
- Base directory provided in output for resolving bundled resources (references/, scripts/, assets/)

Usage notes:
- Only use skills listed in <available_skills> below
- Do not invoke a skill that is already loaded in your context
- Each skill invocation is stateless
</usage>

<available_skills>

<skill>
<name>ai-artist</name>
<description>Write and optimize prompts for AI-generated outcomes across text and image models. Use when crafting prompts for LLMs (Claude, GPT, Gemini), image generators (Midjourney, DALL-E, Stable Diffusion, Imagen, Flux), or video generators (Veo, Runway). Covers prompt structure, style keywords, negative prompts, chain-of-thought, few-shot examples, iterative refinement, and domain-specific patterns for marketing, code, and creative writing.</description>
<location>project</location>
</skill>

<skill>
<name>ai-multimodal</name>
<description>Process and generate multimedia content using Google Gemini API for better vision capabilities. Capabilities include analyze audio files (transcription with timestamps, summarization, speech understanding, music/sound analysis up to 9.5 hours), understand images (better image analysis than Claude models, captioning, reasoning, object detection, design extraction, OCR, visual Q&A, segmentation, handle multiple images), process videos (scene detection, Q&A, temporal analysis, YouTube URLs, up to 6 hours), extract from documents (PDF tables, forms, charts, diagrams, multi-page), generate images (text-to-image with Imagen 4, editing, composition, refinement), generate videos (text-to-video with Veo 3, 8-second clips with native audio). Use when working with audio/video files, analyzing images or screenshots (instead of default vision capabilities of Claude, only fallback to Claude's vision capabilities if needed), processing PDF documents, extracting structured data from media, creating images/videos from text prompts, or implementing multimodal AI features. Supports Gemini 3/2.5, Imagen 4, and Veo 3 models with context windows up to 2M tokens.</description>
<location>project</location>
</skill>

<skill>
<name>algorithmic-art</name>
<description>Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration. Use this when users request creating art using code, generative art, algorithmic art, flow fields, or particle systems. Create original algorithmic art rather than copying existing artists' work to avoid copyright violations.</description>
<location>project</location>
</skill>

<skill>
<name>backend-development</name>
<description>Build robust backend systems with modern technologies (Node.js, Python, Go, Rust), frameworks (NestJS, FastAPI, Django), databases (PostgreSQL, MongoDB, Redis), APIs (REST, GraphQL, gRPC), authentication (OAuth 2.1, JWT), testing strategies, security best practices (OWASP Top 10), performance optimization, scalability patterns (microservices, caching, sharding), DevOps practices (Docker, Kubernetes, CI/CD), and monitoring. Use when designing APIs, implementing authentication, optimizing database queries, setting up CI/CD pipelines, handling security vulnerabilities, building microservices, or developing production-ready backend systems.</description>
<location>project</location>
</skill>

<skill>
<name>better-auth</name>
<description>Implement authentication and authorization with Better Auth - a framework-agnostic TypeScript authentication framework. Features include email/password authentication with verification, OAuth providers (Google, GitHub, Discord, etc.), two-factor authentication (TOTP, SMS), passkeys/WebAuthn support, session management, role-based access control (RBAC), rate limiting, and database adapters. Use when adding authentication to applications, implementing OAuth flows, setting up 2FA/MFA, managing user sessions, configuring authorization rules, or building secure authentication systems for web applications.</description>
<location>project</location>
</skill>

<skill>
<name>brand-guidelines</name>
<description>Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply.</description>
<location>project</location>
</skill>

<skill>
<name>canvas-design</name>
<description>Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece of art, design, or other static piece. Create original visual designs, never copying existing artists' work to avoid copyright violations.</description>
<location>project</location>
</skill>

<skill>
<name>chrome-devtools</name>
<description>Browser automation, debugging, and performance analysis using Puppeteer CLI scripts. Use for automating browsers, taking screenshots, analyzing performance, monitoring network traffic, web scraping, form automation, and JavaScript debugging.</description>
<location>project</location>
</skill>

<skill>
<name>claude-code</name>
<description>Activate when users ask about Claude Code installation, slash commands (/cook, /plan, /fix, /test, /docs, /design, /git), creating/managing Agent Skills, configuring MCP servers, setting up hooks/plugins, IDE integration (VS Code, JetBrains), CI/CD workflows, enterprise deployment (SSO, RBAC, sandboxing), troubleshooting authentication/performance issues, or advanced features (extended thinking, caching, checkpointing).</description>
<location>project</location>
</skill>

<skill>
<name>code-review</name>
<description>Use when receiving code review feedback (especially if unclear or technically questionable), when completing tasks or major features requiring review before proceeding, or before making any completion/success claims. Covers three practices - receiving feedback with technical rigor over performative agreement, requesting reviews via code-reviewer subagent, and verification gates requiring evidence before any status claims. Essential for subagent-driven development, pull requests, and preventing false completion claims.</description>
<location>project</location>
</skill>

<skill>
<name>context-engineering</name>
<description>>-</description>
<location>project</location>
</skill>

<skill>
<name>databases</name>
<description>Work with MongoDB (document database, BSON documents, aggregation pipelines, Atlas cloud) and PostgreSQL (relational database, SQL queries, psql CLI, pgAdmin). Use when designing database schemas, writing queries and aggregations, optimizing indexes for performance, performing database migrations, configuring replication and sharding, implementing backup and restore strategies, managing database users and permissions, analyzing query performance, or administering production databases.</description>
<location>project</location>
</skill>

<skill>
<name>debugging</name>
<description>Systematic debugging framework ensuring root cause investigation before fixes. Includes four-phase debugging process, backward call stack tracing, multi-layer validation, and verification protocols. Use when encountering bugs, test failures, unexpected behavior, performance issues, or before claiming work complete. Prevents random fixes, masks over symptoms, and false completion claims.</description>
<location>project</location>
</skill>

<skill>
<name>devops</name>
<description>Deploy and manage cloud infrastructure on Cloudflare (Workers, R2, D1, KV, Pages, Durable Objects, Browser Rendering), Docker containers, and Google Cloud Platform (Compute Engine, GKE, Cloud Run, App Engine, Cloud Storage). Use when deploying serverless functions to the edge, configuring edge computing solutions, managing Docker containers and images, setting up CI/CD pipelines, optimizing cloud infrastructure costs, implementing global caching strategies, working with cloud databases, or building cloud-native applications.</description>
<location>project</location>
</skill>

<skill>
<name>doc-coauthoring</name>
<description>Guide users through a structured workflow for co-authoring documentation. Use when user wants to write documentation, proposals, technical specs, decision docs, or similar structured content. This workflow helps users efficiently transfer context, refine content through iteration, and verify the doc works for readers. Trigger when user mentions writing docs, creating proposals, drafting specs, or similar documentation tasks.</description>
<location>project</location>
</skill>

<skill>
<name>docs-seeker</name>
<description>"Search technical documentation using executable scripts to detect query type, fetch from llms.txt sources (context7.com), and analyze results. Use when user needs: (1) Topic-specific documentation (features/components/concepts), (2) Library/framework documentation, (3) GitHub repository analysis, (4) Documentation discovery with automated agent distribution strategy"</description>
<location>project</location>
</skill>

<skill>
<name>docx</name>
<description>"Comprehensive document creation, editing, and analysis with support for tracked changes, comments, formatting preservation, and text extraction. When Claude needs to work with professional documents (.docx files) for: (1) Creating new documents, (2) Modifying or editing content, (3) Working with tracked changes, (4) Adding comments, or any other document tasks"</description>
<location>project</location>
</skill>

<skill>
<name>frontend-design</name>
<description>Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications, OR when they provide screenshots/images/designs to replicate or draw inspiration from. For screenshot inputs, extracts design guidelines first using ai-multimodal analysis, then implements code following those guidelines. Generates creative, polished code that avoids generic AI aesthetics.</description>
<location>project</location>
</skill>

<skill>
<name>frontend-development</name>
<description>Frontend development guidelines for React/TypeScript applications. Modern patterns including Suspense, lazy loading, useSuspenseQuery, file organization with features directory, MUI v7 styling, TanStack Router, performance optimization, and TypeScript best practices. Use when creating components, pages, features, fetching data, styling, routing, or working with frontend code.</description>
<location>project</location>
</skill>

<skill>
<name>google-adk-python</name>
<description></description>
<location>project</location>
</skill>

<skill>
<name>internal-comms</name>
<description>A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use this skill whenever asked to write some sort of internal communications (status reports, leadership updates, 3P updates, company newsletters, FAQs, incident reports, project updates, etc.).</description>
<location>project</location>
</skill>

<skill>
<name>markdown-novel-viewer</name>
<description></description>
<location>project</location>
</skill>

<skill>
<name>mcp-builder</name>
<description>Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK).</description>
<location>project</location>
</skill>

<skill>
<name>mcp-management</name>
<description>Manage Model Context Protocol (MCP) servers - discover, analyze, and execute tools/prompts/resources from configured MCP servers. Use when working with MCP integrations, need to discover available MCP capabilities, filter MCP tools for specific tasks, execute MCP tools programmatically, access MCP prompts/resources, or implement MCP client functionality. Supports intelligent tool selection, multi-server management, and context-efficient capability discovery.</description>
<location>project</location>
</skill>

<skill>
<name>media-processing</name>
<description>Process multimedia files with FFmpeg (video/audio encoding, conversion, streaming, filtering, hardware acceleration), ImageMagick (image manipulation, format conversion, batch processing, effects, composition), and RMBG (AI-powered background removal). Use when converting media formats, encoding videos with specific codecs (H.264, H.265, VP9), resizing/cropping images, removing backgrounds from images, extracting audio from video, applying filters and effects, optimizing file sizes, creating streaming manifests (HLS/DASH), generating thumbnails, batch processing images, creating composite images, or implementing media processing pipelines. Supports 100+ formats, hardware acceleration (NVENC, QSV), and complex filtergraphs.</description>
<location>project</location>
</skill>

<skill>
<name>mermaidjs-v11</name>
<description>Create diagrams and visualizations using Mermaid.js v11 syntax. Use when generating flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, Gantt charts, user journeys, timelines, architecture diagrams, or any of 24+ diagram types. Supports JavaScript API integration, CLI rendering to SVG/PNG/PDF, theming, configuration, and accessibility features. Essential for documentation, technical diagrams, project planning, system architecture, and visual communication.</description>
<location>project</location>
</skill>

<skill>
<name>mobile-development</name>
<description>Build modern mobile applications with React Native, Flutter, Swift/SwiftUI, and Kotlin/Jetpack Compose. Covers mobile-first design principles, performance optimization (battery, memory, network), offline-first architecture, platform-specific guidelines (iOS HIG, Material Design), testing strategies, security best practices, accessibility, app store deployment, and mobile development mindset. Use when building mobile apps, implementing mobile UX patterns, optimizing for mobile constraints, or making native vs cross-platform decisions.</description>
<location>project</location>
</skill>

<skill>
<name>payment-integration</name>
<description>Implement payment integrations with SePay (Vietnamese payment gateway with VietQR, bank transfers, cards) and Polar (global SaaS monetization platform with subscriptions, usage-based billing, automated benefits). Use when integrating payment processing, implementing checkout flows, managing subscriptions, handling webhooks, processing bank transfers, generating QR codes, automating benefit delivery, or building billing systems. Supports authentication (API keys, OAuth2), product management, customer portals, tax compliance (Polar as MoR), and comprehensive SDK integrations (Node.js, PHP, Python, Go, Laravel, Next.js).</description>
<location>project</location>
</skill>

<skill>
<name>pdf</name>
<description>Comprehensive PDF manipulation toolkit for extracting text and tables, creating new PDFs, merging/splitting documents, and handling forms. When Claude needs to fill in a PDF form or programmatically process, generate, or analyze PDF documents at scale.</description>
<location>project</location>
</skill>

<skill>
<name>planning</name>
<description>Use when you need to plan technical solutions that are scalable, secure, and maintainable.</description>
<location>project</location>
</skill>

<skill>
<name>plans-kanban</name>
<description></description>
<location>project</location>
</skill>

<skill>
<name>pptx</name>
<description>"Presentation creation, editing, and analysis. When Claude needs to work with presentations (.pptx files) for: (1) Creating new presentations, (2) Modifying or editing content, (3) Working with layouts, (4) Adding comments or speaker notes, or any other presentation tasks"</description>
<location>project</location>
</skill>

<skill>
<name>problem-solving</name>
<description>Apply systematic problem-solving techniques for complexity spirals (simplification cascades), innovation blocks (collision-zone thinking), recurring patterns (meta-pattern recognition), assumption constraints (inversion exercise), scale uncertainty (scale game), and dispatch when stuck. Techniques derived from Microsoft Amplifier project patterns adapted for immediate application.</description>
<location>project</location>
</skill>

<skill>
<name>repomix</name>
<description>Package entire code repositories into single AI-friendly files using Repomix. Capabilities include pack codebases with customizable include/exclude patterns, generate multiple output formats (XML, Markdown, plain text), preserve file structure and context, optimize for AI consumption with token counting, filter by file types and directories, add custom headers and summaries. Use when packaging codebases for AI analysis, creating repository snapshots for LLM context, analyzing third-party libraries, preparing for security audits, generating documentation context, or evaluating unfamiliar codebases.</description>
<location>project</location>
</skill>

<skill>
<name>research</name>
<description>Use when you need to research, analyze, and plan technical solutions that are scalable, secure, and maintainable.</description>
<location>project</location>
</skill>

<skill>
<name>sequential-thinking</name>
<description>Apply structured, reflective problem-solving for complex tasks requiring multi-step analysis, revision capability, and hypothesis verification. Use for complex problem decomposition, adaptive planning, analysis needing course correction, problems with unclear scope, multi-step solutions, and hypothesis-driven work.</description>
<location>project</location>
</skill>

<skill>
<name>shopify</name>
<description>Build Shopify applications, extensions, and themes using GraphQL/REST APIs, Shopify CLI, Polaris UI components, and Liquid templating. Capabilities include app development with OAuth authentication, checkout UI extensions for customizing checkout flow, admin UI extensions for dashboard integration, POS extensions for retail, theme development with Liquid, webhook management, billing API integration, product/order/customer management. Use when building Shopify apps, implementing checkout customizations, creating admin interfaces, developing themes, integrating payment processing, managing store data via APIs, or extending Shopify functionality.</description>
<location>project</location>
</skill>

<skill>
<name>skill-creator</name>
<description>Guide for creating effective skills, adding skill references, skill scripts or optimizing existing skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, frameworks, libraries or plugins usage, or API and tool integrations.</description>
<location>project</location>
</skill>

<skill>
<name>slack-gif-creator</name>
<description>Knowledge and utilities for creating animated GIFs optimized for Slack. Provides constraints, validation tools, and animation concepts. Use when users request animated GIFs for Slack like "make me a GIF of X doing Y for Slack."</description>
<location>project</location>
</skill>

<skill>
<name>template</name>
<description>Replace with description of the skill and when Claude should use it.</description>
<location>project</location>
</skill>

<skill>
<name>template-skill</name>
<description>Replace with description of the skill and when Claude should use it.</description>
<location>project</location>
</skill>

<skill>
<name>theme-factory</name>
<description>Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact that has been creating, or can generate a new theme on-the-fly.</description>
<location>project</location>
</skill>

<skill>
<name>threejs</name>
<description>Build immersive 3D web experiences with Three.js - WebGL/WebGPU library for scenes, cameras, geometries, materials, lights, animations, loaders, post-processing, shaders (including node-based TSL), compute, physics, VR/XR, and advanced rendering. Use when creating 3D visualizations, games, interactive graphics, data viz, product configurators, architectural walkthroughs, or WebGL/WebGPU applications. Covers OrbitControls, GLTF/FBX loading, PBR materials, shadow mapping, post-processing effects (bloom, SSAO, SSR), custom shaders, instancing, LOD, animation systems, and WebXR.</description>
<location>project</location>
</skill>

<skill>
<name>ui-styling</name>
<description>Create beautiful, accessible user interfaces with shadcn/ui components (built on Radix UI + Tailwind), Tailwind CSS utility-first styling, and canvas-based visual designs. Use when building user interfaces, implementing design systems, creating responsive layouts, adding accessible components (dialogs, dropdowns, forms, tables), customizing themes and colors, implementing dark mode, generating visual designs and posters, or establishing consistent styling patterns across applications.</description>
<location>project</location>
</skill>

<skill>
<name>ui-ux-pro-max</name>
<description>"UI/UX design intelligence. 50 styles, 21 palettes, 50 font pairings, 20 charts, 8 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind). Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, check UI/UX code. Projects: website, landing page, dashboard, admin panel, e-commerce, SaaS, portfolio, blog, mobile app, .html, .tsx, .vue, .svelte. Elements: button, modal, navbar, sidebar, card, table, form, chart. Styles: glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, responsive, skeuomorphism, flat design. Topics: color palette, accessibility, animation, layout, typography, font pairing, spacing, hover, shadow, gradient."</description>
<location>project</location>
</skill>

<skill>
<name>web-artifacts-builder</name>
<description>Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state management, routing, or shadcn/ui components - not for simple single-file HTML/JSX artifacts.</description>
<location>project</location>
</skill>

<skill>
<name>web-frameworks</name>
<description>Build modern full-stack web applications with Next.js (App Router, Server Components, RSC, PPR, SSR, SSG, ISR), Turborepo (monorepo management, task pipelines, remote caching, parallel execution), and RemixIcon (3100+ SVG icons in outlined/filled styles). Use when creating React applications, implementing server-side rendering, setting up monorepos with multiple packages, optimizing build performance and caching strategies, adding icon libraries, managing shared dependencies, or working with TypeScript full-stack projects.</description>
<location>project</location>
</skill>

<skill>
<name>webapp-testing</name>
<description>Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs.</description>
<location>project</location>
</skill>

<skill>
<name>xlsx</name>
<description>"Comprehensive spreadsheet creation, editing, and analysis with support for formulas, formatting, data analysis, and visualization. When Claude needs to work with spreadsheets (.xlsx, .xlsm, .csv, .tsv, etc) for: (1) Creating new spreadsheets with formulas and formatting, (2) Reading or analyzing data, (3) Modify existing spreadsheets while preserving formulas, (4) Data analysis and visualization in spreadsheets, or (5) Recalculating formulas"</description>
<location>project</location>
</skill>

</available_skills>
<!-- SKILLS_TABLE_END -->

</skills_system>
