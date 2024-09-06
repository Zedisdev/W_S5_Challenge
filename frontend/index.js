async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  const axios = require('axios');

  let mentors = []; // fix this
  let learners = []; // fix this

  async function fetchData() {
    try {
      // Use Axios to GET learners and mentors concurrently using Promise.all
      const [learnersResponse, mentorsResponse] = await Promise.all([
        axios.get('http://localhost:3003/api/learners'),
        axios.get('http://localhost:3003/api/mentors'),
      ]);

      // Store the data from the response
      learners = learnersResponse.data;
      mentors = mentorsResponse.data;

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  await fetchData(); // Ensure data is fetched before proceeding

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // Create a map of mentors with ID as key for easy lookup
  const mentorsMap = new Map();
  mentors.forEach(mentor => mentorsMap.set(mentor.id, mentor.name));

  // Combine learners and mentors
  learners = learners.map(learner => {
    return {
      id: learner.id,
      fullName: learner.fullName,
      email: learner.email,
      mentors: learner.mentors.map(mentorId => mentorsMap.get(mentorId)), // Map mentor IDs to names
    };
  });

  // 👆 ==================== TASK 2 END ====================== 👆

  // 👇 ==================== TASK 3 START ==================== 👇

  const cardsContainer = document.querySelector('.cards');
  const info = document.querySelector('.info');
  info.textContent = 'No learner is selected';

  for (let learner of learners) { // looping over each learner object

    // Create card elements
    const card = document.createElement('div');
    const heading = document.createElement('h3');
    const email = document.createElement('div');
    const mentorsHeading = document.createElement('h4');
    const mentorsList = document.createElement('ul');

    // Assign classes and text content
    card.className = 'card';
    heading.className = 'heading';
    email.className = 'email';
    mentorsHeading.className = 'mentors-heading';
    mentorsList.className = 'mentors-list';

    heading.textContent = learner.fullName;
    email.textContent = learner.email;
    mentorsHeading.textContent = 'Mentors:';

    // Loop over mentors and create <li> elements
    learner.mentors.forEach(mentorName => {
      const li = document.createElement('li');
      li.textContent = mentorName;
      mentorsList.appendChild(li);
    });

    // Append elements to the card
    card.appendChild(heading);
    card.appendChild(email);
    card.appendChild(mentorsHeading);
    card.appendChild(mentorsList);

    // Append the card to the cards container
    cardsContainer.appendChild(card);

    // Add event listener inside the loop, so `card` and `learner` are defined
    card.addEventListener('click', (evt) => {
      const mentorsHeading = card.querySelector('h4');
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading;
      const isCardSelected = card.classList.contains('selected');

      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected');
        crd.querySelector('h3').textContent = crd.dataset.fullName;
      });
      info.textContent = 'No learner is selected';

      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected');
          heading.textContent += `, ID ${learner.id}`;
          info.textContent = `The selected learner is ${learner.fullName}`;
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected');
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed');
        } else {
          mentorsHeading.classList.replace('closed', 'open');
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`;
          info.textContent = `The selected learner is ${learner.fullName}`;
        }
      }
    });
  }

  // 👆 ==================== TASK 3 END ====================== 👆

  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  // ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sprintChallenge5 };
  } else {
    sprintChallenge5();
  }} 