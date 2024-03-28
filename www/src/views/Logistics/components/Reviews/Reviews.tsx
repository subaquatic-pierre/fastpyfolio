import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const mock = [
  {
    feedback:
      "👋 Hey! I'm a passionate software engineer with a drive for crafting robust solutions and architecting cloud infrastructure that propels businesses forward. My toolkit includes languages such as Rust, Python, React, and Typescript, enabling me to tackle diverse challenges and deliver innovative solutions. Let's build the future together! 🚀",
    name: 'Pierre Du Toit',
    title: 'Software Engineer | Cloud Architect',
    avatar: '/images/pierre.jpeg'
  }
  // {
  //   feedback: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //   name: 'Jhon Anderson',
  //   title: 'Senior Frontend Developer',
  //   avatar: 'https://assets.maccarianagency.com/avatars/img5.jpg'
  // },
  // {
  //   feedback: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //   name: 'Chary Smith',
  //   title: 'SEO at Comoti',
  //   avatar: 'https://assets.maccarianagency.com/avatars/img6.jpg'
  // }
];

const Reviews = (): JSX.Element => {
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          align={'center'}
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
            color: 'common.white'
          }}
        >
          Meet the Face Behind the Code
        </Typography>
        <Typography variant="h6" align={'center'} data-aos={'fade-up'} sx={{ color: 'common.white' }}>
          Get to know the person behind the screen. Here's a glimpse into my journey and experiences in the tech world.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={4} xs={0} />
        {mock.map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Box
              width={1}
              height={1}
              data-aos={'fade-up'}
              data-aos-delay={i * 100}
              data-aos-offset={100}
              data-aos-duration={600}
              component={Card}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              boxShadow={0}
              variant={'outlined'}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box sx={{ paddingBottom: 2 }}>
                  <ListItem component="div" disableGutters sx={{ padding: 0 }}>
                    <ListItemAvatar sx={{ marginRight: 3 }}>
                      <Avatar src={item.avatar} variant={'rounded'} sx={{ width: 100, height: 100, borderRadius: 2 }} />
                    </ListItemAvatar>
                    <ListItemText sx={{ margin: 0 }} primary={item.name} secondary={item.title} />
                  </ListItem>
                </Box>
                <Typography color="text.secondary">{item.feedback}</Typography>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reviews;
