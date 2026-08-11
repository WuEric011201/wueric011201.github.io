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
          section: "News",},{id: "projects-opto-electronic-front-end-redesign",
          title: 'Opto-Electronic Front-End Redesign',
          description: "Redesign of the photodiode receiver front end for DeepSight Technology&#39;s imaging system — noise, stability, and power, from analytic modeling through topology selection, PCB layout, and production.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/0_project/";
            },},{id: "projects-analog-synthesizer-vcv-rack",
          title: 'Analog Synthesizer (VCV Rack)',
          description: "Two VCV Rack synth patches — a long-form West Coast drone inspired by Éliane Radigue, and a compact East Coast (VCO → VCF → VCA) patch with separate lead, bass, and chord voices.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/10_project/";
            },},{id: "projects-accelerating-distributed-digital-ising-machines",
          title: 'Accelerating Distributed Digital Ising Machines',
          description: "A calibrated cost model that says which of compute, memory, synchronization, or communication binds a distributed Ising machine, plus the data placement, scheduling, and streaming techniques it points to. Validated across GPUs, FPGAs, and a 28 nm ASIC.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/11_project/";
            },},{id: "projects-a-four-chip-28-nm-p-bit-asic-tapeout",
          title: 'A Four-Chip 28 nm p-bit ASIC Tapeout',
          description: "Four fabricated 28 nm chips, 6,912 spins each, wired as a mesh. A streaming schedule hides every chip-to-chip transfer behind interior work, holding time per sweep flat as chips are added.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/12_project/";
            },},{id: "projects-pcie-switch-modeling-for-ai-inference-fabrics",
          title: 'PCIe Switch Modeling for AI Inference Fabrics',
          description: "A transaction-level model of a PCIe switch, built to find where a fabric actually stalls. Credit-based backpressure, virtual output queues, arbitration policy, and routing, evaluated under realistic traffic instead of at a single operating point.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/15_project/";
            },},{id: "projects-fuzz-amp-overdrive-guitar-pedal",
          title: 'Fuzz &amp;amp; Overdrive Guitar Pedal',
          description: "Op-amp overdrive with asymmetrical soft clipping, 3-band EQ tone stack, and a clean-blend low-end preserve, housed in a hand-drilled enclosure.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-13-band-equalizer-on-fpga-microblaze",
          title: '13-Band Equalizer on FPGA + MicroBlaze',
          description: "Stereo 13-band FIR EQ at 50 kHz sample rate, with custom SPI for the LTC1865L ADC and LTC1654 DAC, controlled in C from a MicroBlaze soft-core over AXI4-Lite.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-analog-compression-teensy-multi-effect-processor",
          title: 'Analog Compression + Teensy Multi-effect Processor',
          description: "Analog compression front end combined with Teensy 4.0 DSP — tremolo, delay, and reverb algorithms, line/instrument/mic inputs, and up to 2 W of output to drive a stage cab.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-overdrive-guitar-pedal",
          title: 'Overdrive Guitar Pedal',
          description: "A standalone overdrive pedal — Volume, Tone, Gain, and a harshness switch — built for a friend.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-4-complete-songs-fall-2022",
          title: '4 Complete Songs (Fall 2022)',
          description: "Four finished tracks from Fall 2022, including &quot;Nanjing&quot; — a piece named after my hometown.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-music-demo-dump",
          title: 'Music DEMO Dump',
          description: "An evolving collection of demo tracks, sketches, and works-in-progress.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-frequency-modulation-synthesis",
          title: 'Frequency Modulation Synthesis',
          description: "FM synthesis experiments using Dexed alongside guitar.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-synth-metal-wait",
          title: 'Synth Metal: WAIT',
          description: "A four-minute synth-metal instrumental built with Dexed, Vital, and VCV Rack — influenced by Slipknot and German industrial metal.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
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
