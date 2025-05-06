/* Auto-generated - DO NOT EDIT */

export interface CommentEntity {
  id: string;
  postId: string;
  userId: string;
  body: string;
  createdAt: Date;
}

export interface ReplyEntity {
  id: string;
  commentId: string;
  userId: string;
  body: string;
  createdAt: Date;
}

export interface PostEntity {
  id: string;
  name: string;
  likes: number;
  userId: string;
  yay_u: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserEntity {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}