'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import TeamMemberCard from '../TeamMemberCard/TeamMemberCard';
import { IState } from '@/interfaces/interfaces';
import { useSelector } from 'react-redux';

const MainInform = () => {
  const languageData = useSelector((state: IState) => state.main.languageData);

  const teamMembers = [
    {
      name: languageData.name1,
      role: languageData.role1,
      description: languageData.desc1,
      imageSrc: '/photo.png',
      githubLink: 'https://github.com/huntertigerx',
    },
    {
      name: languageData.name2,
      role: languageData.role2,
      description: languageData.desc2,
      imageSrc: '/photo.png',
      githubLink: 'https://github.com/c00b3r',
    },
    {
      name: languageData.name3,
      role: languageData.role2,
      description: languageData.desc3,
      imageSrc: '/photo.png',
      githubLink: 'https://github.com/LaraNU',
    },
  ];

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
                  {languageData.paragraph1}
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
                  {languageData.paragraph2}
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
                  {languageData.paragraphHeader}
                </Typography>
                <Typography variant="body1" paragraph>
                  {languageData.paragraph3}
                </Typography>
                <Typography variant="body1" paragraph>
                  {languageData.paragraph4}
                </Typography>
                <Typography variant="body1" paragraph>
                  {languageData.paragraph5}
                </Typography>
                <Typography variant="body1" paragraph>
                  {languageData.paragraph6}
                </Typography>
                <Typography variant="body1" paragraph>
                  {languageData.paragraph7}
                </Typography>
              </Paper>
            </Box>
          </Grid>

          <Grid xs={12}>
            <Box sx={{ mt: 5 }}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {languageData.aboutHeader}
                </Typography>
                <Typography variant="body1" paragraph>
                  {languageData.paragraph8}
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
