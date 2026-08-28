// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "post-this-is-my-band",
        
          title: "This is my band",
        
        description: "My former band at Washington University in Saint Louis.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/this-is-my-band/";
          
        },
      },{id: "post-2024-12-19-读后感",
        
          title: "2024.12.19 读后感",
        
        description: "A reading reflection on David Foster Wallace&#39;s &quot;This is Water.&quot;",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/dushuganxiang/";
          
        },
      },{id: "post-回国两周",
        
          title: "回国两周",
        
        description: "Two weeks back home in China.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/huiguo-liang-zhou/";
          
        },
      },{id: "post-台湾",
        
          title: "台湾",
        
        description: "Notes from a trip to Taiwan.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/taiwan/";
          
        },
      },{id: "post-concussion-allan-work-life-balance",
        
          title: "Concussion, Allan, Work-Life Balance",
        
        description: "On recovering, friendship, and finding balance.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/concussion-work-life-balance/";
          
        },
      },{id: "post-日记",
        
          title: "日记",
        
        description: "A diary entry.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/riji/";
          
        },
      },{id: "post-颓废日记",
        
          title: "颓废日记",
        
        description: "A self-indulgent journal entry.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/tuifei-riji/";
          
        },
      },{id: "post-from-indian-music",
        
          title: "From Indian Music",
        
        description: "Learning from an Indian violinist in jazz class, and parallels between Chinese and Indian musical traditions.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/from-indian-music/";
          
        },
      },{id: "post-随笔",
        
          title: "随笔",
        
        description: "On leisure, life choices, and classical Chinese literature.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/brief-notes/";
          
        },
      },{id: "post-thoughts-and-learning",
        
          title: "Thoughts and Learning",
        
        description: "On Chinese-American relations, political philosophy, and historical governance.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/thoughts-and-learning/";
          
        },
      },{id: "post-从农村开始",
        
          title: "从农村开始",
        
        description: "Rural depopulation in northern China, and whether to go home or stay.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/starting-from-rural-areas/";
          
        },
      },{id: "post-jazz-session-reflections",
        
          title: "Jazz Session Reflections",
        
        description: "Observations from jazz sessions — improvisation, discipline, and how it maps to life.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/jazz-session-reflections/";
          
        },
      },{id: "post-普世价值与民主",
        
          title: "普世价值与民主?",
        
        description: "Western influence on modern China and Confucian conceptions of governance.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/universal-values-and-democracy/";
          
        },
      },{id: "post-秦晖教授讲座",
        
          title: "秦晖教授讲座",
        
        description: "Notes on land reform, urban poverty, and political-system reform in China, from Prof. Qin Hui&#39;s lecture.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/professor-qin-hui-lecture/";
          
        },
      },{id: "news-co-author-on-foundry-monolithic-3d-unlocks-large-throughput-benefits-accepted-to-iedm-2025-san-francisco",
          title: 'Co-author on Foundry Monolithic 3D Unlocks Large Throughput Benefits… — accepted to IEDM...',
          description: "",
          section: "News",},{id: "projects-photodiode-front-end-redesign",
          title: 'Photodiode Front-End Redesign',
          description: "60% less power and 60% less noise on DeepSight&#39;s imaging receiver, and a board 20–30 °C cooler.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/0_project/";
            },},{id: "projects-vcv-rack-synths",
          title: 'VCV Rack Synths',
          description: "A West Coast drone and a compact East Coast patch.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/10_project/";
            },},{id: "projects-distributed-ising-machines",
          title: 'Distributed Ising Machines',
          description: "4.2x from data placement, 3.16x from scheduling, 2.01x from streaming — on GPUs, FPGAs and a 28 nm ASIC.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/11_project/";
            },},{id: "projects-28-nm-p-bit-tapeout",
          title: '28 nm p-bit Tapeout',
          description: "Four fabricated chips, 27,648 spins, 32.4x faster than an H200.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/12_project/";
            },},{id: "projects-custom-sram-macro",
          title: 'Custom SRAM Macro',
          description: "4 kb drawn from the bitcell up. 25 FO4 read at 1.19 mW",
          section: "Projects",handler: () => {
              window.location.href = "/projects/13_project/";
            },},{id: "projects-monolithic-3d-memory",
          title: 'Monolithic 3D Memory',
          description: "A 1 kb ReRAM and carbon nanotube array, taped out and brought up on the bench.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/14_project/";
            },},{id: "projects-nsp-network-modeling",
          title: 'NSP Network Modeling',
          description: "Architecture modeling and design exploration that improved throughput from 36% to 88% of theoretical peak.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/15_project/";
            },},{id: "projects-woodshop",
          title: 'Woodshop',
          description: "A walnut box, a folding stool, and some plywood.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/16_project/";
            },},{id: "projects-guitar-pedals",
          title: 'Guitar Pedals',
          description: "Two hand-built drive pedals, in enclosures drilled from scratch.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-13-band-fpga-equalizer",
          title: '13-Band FPGA Equalizer',
          description: "Stereo 13-band FIR at 50 kHz, driven in C from a MicroBlaze soft core.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-teensy-multi-effect",
          title: 'Teensy Multi-effect',
          description: "Analog compression into Teensy 4.0 DSP — tremolo, delay, reverb, 2 W out.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-songwriting",
          title: 'Songwriting',
          description: "Five finished tracks spanning synth metal, electronic production, and collaborations.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-demo-dump",
          title: 'Demo Dump',
          description: "Sketches and works-in-progress.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-fm-synthesis",
          title: 'FM Synthesis',
          description: "Dexed experiments alongside guitar.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%77%75%65%72%69%63%31%35%31@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/WuEric011201", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/tong-wu-624aa2206", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=PYtDidYAAAAJ", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@tw63130", "_blank");
        },
      },{
        id: 'social-soundcloud_username',
        title: 'Soundcloud_username',
        section: 'Socials',
        handler: () => {
          window.open("", "_blank");
        },
      },{
        id: 'social-spotify',
        title: 'Spotify',
        section: 'Socials',
        handler: () => {
          window.open("https://open.spotify.com/user/3Jrym9MCO8TfBAInpVVS6m", "_blank");
        },
      },];
