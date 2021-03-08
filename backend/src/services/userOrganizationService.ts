import sgMail from '@sendgrid/mail';
import { apiKey, emailFrom } from '../config/sendGridConfig';

sgMail.setApiKey(apiKey);
const users: any = [
  {
    id: '1',
    email: 'user1@test.com',
    firstName: 'username1',
    lastName: 'lastname1',
    organizationId: '1'
  },
  {
    id: '2',
    email: 'user2@test.com',
    firstName: 'username2',
    lastName: 'lastname2',
    organizationId: '1'
  },
  {
    id: '3',
    email: 'user3@test.com',
    firstName: 'username3',
    lastName: 'lastname3',
    organizationId: '1'
  },
  {
    id: '4',
    email: 'user4@test.com',
    firstName: 'username4',
    lastName: 'lastname4',
    organizationId: '2'
  }
];

const userOrganization = [
  {
    id: '1',
    role: 'Admin',
    status: 'active',
    userId: '1',
    organizationId: '1'
  },
  {
    id: '2',
    role: 'Developer',
    status: 'active',
    userId: '2',
    organizationId: '1'
  },
  {
    id: '3',
    role: 'Viewer',
    status: 'Pending',
    userId: '4',
    organizationId: '1'
  }
];

const sendEmail = (emailTo: string): void => {
  const msg = {
    to: emailTo,
    from: emailFrom,
    subject: 'invite to organization',
    text: 'test sending email',
    html: '<strong>test sending email</strong>'
  };
  console.log(msg);
  /* sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error: any) => {
      console.error(error);
    }); */
};

interface IUserOrganizationData {
    role?: string,
    status?: string,
    userId: string,
    organizationId: string,
    email?: string
}

export const getUsers = (organizationId: string) => new Promise(resolve => {
  const orgs = userOrganization.filter(org => org.organizationId === organizationId);
  const orgUsers: any = [];
  orgs.forEach(org => {
    const user = users.find((u: any) => u.id === org.userId);
    user.role = org.role;
    user.status = org.status;
    orgUsers.push(user);
  });
  resolve(orgUsers);
});

export const updateUserOrganization = (data: IUserOrganizationData) => new Promise((resolve, reject) => {
  userOrganization.forEach(org => {
    if (org.organizationId === data.organizationId && org.userId === data.userId) {
      const updated = { ...org, ...data };
      const user = users.filter((u: any) => u.id === updated.id)[0];
      user.role = updated.role;
      user.status = updated.status;
      resolve(user);
    }
  });
  reject();
});

export const createUserOrganization = (data: IUserOrganizationData) => new Promise((resolve, reject) => {
  const user = users.filter((u: any) => u.email === data.email)[0];
  const userOrg = userOrganization.filter(o => o.userId === user.id);
  if (userOrg.length > 0) {
    reject();
  }
  const id = new Date().getTime().toString();
  const newUserOrg = {
    id,
    role: data.role,
    status: 'Pending',
    userId: user.id,
    organizationId: data.organizationId
  };
  user.role = newUserOrg.role;
  user.status = newUserOrg.status;
  userOrganization.push(newUserOrg);
  sendEmail(user.email);
  resolve(user);
});

export const resendInvite = (email: string) => new Promise<void>(resolve => {
  sendEmail(email);
  resolve();
});

