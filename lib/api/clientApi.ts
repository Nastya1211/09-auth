import { api } from "./api";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search: search || undefined,
      tag: tag && tag !== "all" ? tag : undefined,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export interface CreateNoteNewData {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (
  noteData: CreateNoteNewData,
): Promise<Note> => {
  const response = await api.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export interface RegisterRequest {
  email: string;
  password: string;
}

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (data: LoginRequest): Promise<User> => {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const response = await api.get<User | null>("/auth/session");
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/users/me");
  return response.data;
};

export interface UpdateMeRequest {
  username?: string;
}

export const updateMe = async (data: UpdateMeRequest): Promise<User> => {
  const response = await api.patch<User>("/users/me", data);
  return response.data;
};
