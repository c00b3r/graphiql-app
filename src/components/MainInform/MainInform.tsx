import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import photo from '../../../public/photo.png';
import TeamMemberCard from '../TeamMemberCard/TeamMemberCard';

const teamMembers = [
  {
    name: 'Mikita Karalkou',
    role: 'Team Lead',
    description: `I am from Minsk, BSUIR graduate. On the project I implemented a GraphiQL page with the required functionality, participated in the development of tests, styles, history page and translations.`,
    imageSrc: `${photo}`,
    githubLink: 'https://github.com/huntertigerx',
  },
  {
    name: 'Aleksandr Vasilev',
    role: 'Frontend Developer',
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis voluptatem nisi voluptates impedit labore qui voluptatum molestias, illum ad possimus laudantium adipisci incidunt ratione enim aut sequi non, fugit iusto.`,
    imageSrc: `${photo}`,
    githubLink: 'https://github.com/c00b3r',
  },
  {
    name: 'Larisa Novozhilova',
    role: 'Frontend Developer',
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis voluptatem nisi voluptates impedit labore qui voluptatum molestias, illum ad possimus laudantium adipisci incidunt ratione enim aut sequi non, fugit iusto.`,
    imageSrc: `${photo}`,
    githubLink: 'https://github.com/LaraNU',
  },
];

const MainInform = () => {
  return (
    <Container maxWidth="lg" style={{ padding: 0 }}>
      <Box sx={{ textAlign: 'center', mb: 4, flexGrow: 1 }}>
        <Grid container>
          <Grid xs={12}>
            <Box sx={{ mt: 5 }}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  About the Project
                </Typography>
                <Typography variant="body1" paragraph>
                  Welcome to our project, developed as part of the React Course at RS School. This project reflects our
                  commitment to learning and implementing cutting-edge web technologies, including Next.js, Firebase,
                  and GraphQL. It has been designed as a multifunctional platform for working with APIs, providing users
                  with the ability to utilize both the GraphQL Client and the REST Client.
                </Typography>
              </Paper>
            </Box>
          </Grid>

          <Grid xs={12}>
            <Box sx={{ mt: 5 }}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  About the Developers
                </Typography>
                <Typography variant="body1" paragraph>
                  Our team consists of passionate developers eager to explore the latest trends in web development. Each
                  member has made significant contributions to various aspects of the project, from interface design to
                  backend integration, ensuring a seamless user experience.
                </Typography>
              </Paper>
            </Box>
          </Grid>

          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ mt: 5 }}>
                <TeamMemberCard
                  name={member.name}
                  role={member.role}
                  description={member.description}
                  imageSrc={member.imageSrc}
                  githubLink={member.githubLink}
                />
              </Grid>
            ))}
          </Grid>

          <Grid xs={12}>
            <Box sx={{ mt: 5 }}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Project Details
                </Typography>
                <Typography variant="body1" paragraph>
                  This project serves as a practical application of the skills we&apos;ve acquired throughout the React
                  Course at RS School. The key features include:
                </Typography>
                <Typography variant="body1" paragraph>
                  - Authentication System: Built using Firebase, it provides secure user registration, login, and
                  session management.
                </Typography>
                <Typography variant="body1" paragraph>
                  - GraphiQL Client: A powerful tool integrated into the platform, allowing users to perform GraphQL
                  queries and view responses in real-time.
                </Typography>
                <Typography variant="body1" paragraph>
                  - REST Client: Provides an interface for interacting with RESTful APIs, with detailed response
                  visualization.
                </Typography>
                <Typography variant="body1" paragraph>
                  - History Management: Users can track their previous requests and interactions, which is useful for
                  future reference.
                </Typography>
              </Paper>
            </Box>
          </Grid>

          <Grid xs={12}>
            <Box sx={{ mt: 5 }}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  About the Course
                </Typography>
                <Typography variant="body1" paragraph>
                  This project is part of the React Course at RS School, aimed at giving students hands-on experience in
                  web development. Throughout the course, we faced various challenges in user interface design, state
                  management, and backend integration, ultimately leading to the creation of this fully functional web
                  application.
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MainInform;
