'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const user = {
  name: 'Sofia Rivers',
  avatar: '/assets/avatar.png',
  jobTitle: 'Senior Developer',
  country: 'USA',
  city: 'Los Angeles',
  timezone: 'GTM-7',
} as const;

export function EmployeeInfo(): React.JSX.Element {
  const [image, setImage] = React.useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={image ?? user.avatar} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{user.name}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button component="label" fullWidth variant="text">
          Upload picture
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
      </CardActions>
    </Card>
  );
}
