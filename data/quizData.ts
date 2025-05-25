export const quizzes = [
  {
    id: 'social-engineering',
    title: 'Social Engineering Tactics',
    description: 'Learn to identify and protect against social engineering attacks',
    category: 'Social',
    difficulty: 'Medium',
    imageUrl: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg',
    questions: [
      {
        text: 'Which of the following is NOT a common social engineering technique?',
        answers: [
          'Phishing',
          'Pretexting',
          'SQL Injection',
          'Baiting'
        ],
        correctAnswer: 2,
        explanation: 'SQL Injection is a technical attack that exploits vulnerabilities in web applications, not a social engineering technique which focuses on manipulating people.'
      },
      {
        text: 'What is "pretexting" in social engineering?',
        answers: [
          'Creating a fake scenario to obtain information',
          'Sending random text messages to potential victims',
          'Pretending a text message is from someone else',
          'Using pre-written scripts for phone scams'
        ],
        correctAnswer: 0,
        explanation: 'Pretexting involves creating a fabricated scenario (a pretext) to engage a victim and gain their trust in order to extract information or influence behavior.'
      },
      {
        text: 'Which psychological principle do social engineers often exploit?',
        answers: [
          'The law of diminishing returns',
          'The principle of least privilege',
          'The principle of authority',
          'The second law of thermodynamics'
        ],
        correctAnswer: 2,
        explanation: 'Social engineers often exploit the principle of authority, where people tend to comply with requests from perceived authority figures without questioning.'
      },
      {
        text: 'What is "tailgating" in the context of social engineering?',
        answers: [
          'Following someone closely in a vehicle',
          'Following someone through a secure door without authorization',
          'Sending multiple phishing emails to the same person',
          'Monitoring someone\'s online activities over time'
        ],
        correctAnswer: 1,
        explanation: 'Tailgating, also known as piggybacking, is when an unauthorized person follows an authorized person through a secure access point without using proper credentials.'
      },
      {
        text: 'Which of the following is a defense against social engineering?',
        answers: [
          'Installing more RAM in your computer',
          'Using complex passwords that change automatically',
          'Regular security awareness training',
          'Disabling all email attachments'
        ],
        correctAnswer: 2,
        explanation: 'Regular security awareness training is the most effective defense against social engineering, as it teaches people to recognize and respond appropriately to potential attacks.'
      }
    ]
  },
  {
    id: 'cryptography',
    title: 'Cryptography Basics',
    description: 'Understand the fundamentals of encryption and cryptographic systems',
    category: 'Cryptography',
    difficulty: 'Easy',
    imageUrl: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg',
    questions: [
      {
        text: 'What is the main purpose of encryption?',
        answers: [
          'To make data transfer faster',
          'To compress data for storage efficiency',
          'To convert data into a form that unauthorized parties cannot understand',
          'To detect errors in data transmission'
        ],
        correctAnswer: 2,
        explanation: 'Encryption transforms readable data (plaintext) into an unreadable format (ciphertext) to protect it from unauthorized access. Only authorized parties with the proper key can decrypt and read the data.'
      },
      {
        text: 'Which of the following is a symmetric encryption algorithm?',
        answers: [
          'RSA',
          'AES',
          'ECC',
          'Diffie-Hellman'
        ],
        correctAnswer: 1,
        explanation: 'AES (Advanced Encryption Standard) is a symmetric encryption algorithm, meaning it uses the same key for both encryption and decryption.'
      },
      {
        text: 'What is a hash function used for?',
        answers: [
          'Encrypting data for secure storage',
          'Creating a fixed-size output from variable input data that cannot be reversed',
          'Securely exchanging encryption keys',
          'Digitally signing documents'
        ],
        correctAnswer: 1,
        explanation: 'A hash function creates a fixed-size string (hash) from data of any size. It\'s a one-way function—you cannot determine the original input from the hash output.'
      }
    ]
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security',
    description: 'Secure your cloud infrastructure against common threats',
    category: 'Network',
    difficulty: 'Hard',
    imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
    questions: [
      {
        text: 'Which cloud service model places the most security responsibility on the customer?',
        answers: [
          'Software as a Service (SaaS)',
          'Platform as a Service (PaaS)',
          'Infrastructure as a Service (IaaS)',
          'All models share equal responsibility'
        ],
        correctAnswer: 2,
        explanation: 'In Infrastructure as a Service (IaaS), the customer has the most security responsibility. The provider only secures the physical infrastructure, while the customer must secure the operating system, applications, data, and everything above.'
      },
      {
        text: 'What is a common cloud security challenge?',
        answers: [
          'Lack of physical access to servers',
          'Misconfigurations in cloud services',
          'Limited scalability options',
          'Lower bandwidth availability'
        ],
        correctAnswer: 1,
        explanation: 'Misconfigurations are one of the most common cloud security issues, often leading to data breaches. This includes improperly configured storage buckets, excessive permissions, or insecure default settings.'
      }
    ]
  },
  {
    id: 'password-security',
    title: 'Password Security',
    description: 'Best practices for creating and managing secure passwords',
    category: 'Web',
    difficulty: 'Easy',
    imageUrl: 'https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg',
    questions: [
      {
        text: 'What is a key characteristic of a strong password?',
        answers: [
          'Contains personal information for memorability',
          'Is the same across multiple accounts',
          'Contains a mix of character types and is sufficiently long',
          'Is changed every day'
        ],
        correctAnswer: 2,
        explanation: 'Strong passwords include a mixture of uppercase and lowercase letters, numbers, and special characters, with sufficient length (usually at least 12 characters) to resist brute force attacks.'
      },
      {
        text: 'What is the recommended way to manage multiple complex passwords?',
        answers: [
          'Write them down on paper',
          'Use the same password with slight variations',
          'Use a password manager',
          'Store them in a text file on your computer'
        ],
        correctAnswer: 2,
        explanation: 'Password managers securely store encrypted passwords, generate strong unique passwords, and automatically fill them in when needed, solving the problem of remembering multiple complex passwords.'
      }
    ]
  },
  {
    id: 'network-security',
    title: 'Network Security Fundamentals',
    description: 'Protect your networks from unauthorized access and attacks',
    category: 'Network',
    difficulty: 'Medium',
    imageUrl: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg',
    questions: [
      {
        text: 'What is the purpose of a firewall?',
        answers: [
          'To detect viruses in files',
          'To filter network traffic based on security rules',
          'To encrypt data during transmission',
          'To back up important data'
        ],
        correctAnswer: 1,
        explanation: 'A firewall acts as a barrier between a trusted network and untrusted networks, filtering traffic based on predetermined security rules to prevent unauthorized access.'
      },
      {
        text: 'What does VPN stand for?',
        answers: [
          'Virtual Private Network',
          'Very Protected Network',
          'Virtual Public Network',
          'Verified Personal Network'
        ],
        correctAnswer: 0,
        explanation: 'VPN stands for Virtual Private Network, which creates an encrypted tunnel for your internet traffic, protecting your data and privacy, especially on public networks.'
      }
    ]
  },
  {
    id: 'malware-analysis',
    title: 'Malware Types and Analysis',
    description: 'Learn about different malware types and how to analyze them',
    category: 'Malware',
    difficulty: 'Hard',
    imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
    questions: [
      {
        text: 'Which type of malware encrypts files and demands payment for the decryption key?',
        answers: [
          'Worm',
          'Trojan',
          'Ransomware',
          'Spyware'
        ],
        correctAnswer: 2,
        explanation: 'Ransomware is malware that encrypts the victim\'s files, making them inaccessible, and demands a ransom payment (typically in cryptocurrency) for the decryption key.'
      },
      {
        text: 'What is a "zero-day exploit"?',
        answers: [
          'An exploit that requires zero coding knowledge',
          'An exploit that takes zero days to develop',
          'An exploit for a vulnerability that has been patched for zero days',
          'An exploit for a vulnerability unknown to the software vendor'
        ],
        correctAnswer: 3,
        explanation: 'A zero-day exploit targets a previously unknown vulnerability that hasn\'t yet been patched by the software vendor, giving defenders "zero days" to develop protections.'
      }
    ]
  }
];