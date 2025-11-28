import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  QueryConstraint,
  DocumentData,
} from 'firebase/firestore';
import { db } from './config';
import { Project } from '@/types/project';
import { Testimonial } from '@/types/testimonial';
import { TimelineEvent } from '@/types/timeline';
import { Subscriber } from '@/types/subscriber';
import { TeamMember } from '@/types/team';
import { TransparencySheet } from '@/types/transparency';

// Helper to convert Firestore timestamps
function convertTimestamps(data: DocumentData): any {
  const converted = { ...data };
  Object.keys(converted).forEach(key => {
    if (converted[key] instanceof Timestamp) {
      converted[key] = converted[key].toDate();
    }
  });
  return converted;
}

// Projects
export async function getProjects(filters?: { status?: string; category?: string }): Promise<Project[]> {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  
  if (filters?.status) {
    constraints.push(where('status', '==', filters.status));
  }
  if (filters?.category) {
    constraints.push(where('category', '==', filters.category));
  }

  const q = query(collection(db, 'projects'), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Project[];
}

export async function getProject(id: string): Promise<Project | null> {
  const docRef = doc(db, 'projects', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...convertTimestamps(docSnap.data()) } as Project;
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const now = new Date();
  const docRef = await addDoc(collection(db, 'projects'), {
    ...project,
    createdAt: Timestamp.fromDate(now),
    updatedAt: Timestamp.fromDate(now),
  });
  return docRef.id;
}

export async function updateProject(id: string, project: Partial<Project>): Promise<void> {
  const docRef = doc(db, 'projects', id);
  await updateDoc(docRef, {
    ...project,
    updatedAt: Timestamp.fromDate(new Date()),
  });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, 'projects', id));
}

// Testimonials
export async function getTestimonials(projectId?: string): Promise<Testimonial[]> {
  const constraints: QueryConstraint[] = [orderBy('date', 'desc')];
  if (projectId) {
    constraints.push(where('projectId', '==', projectId));
  }
  const q = query(collection(db, 'testimonials'), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Testimonial[];
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'testimonials'), {
    ...testimonial,
    createdAt: Timestamp.fromDate(new Date()),
  });
  return docRef.id;
}

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>): Promise<void> {
  await updateDoc(doc(db, 'testimonials', id), testimonial);
}

export async function deleteTestimonial(id: string): Promise<void> {
  await deleteDoc(doc(db, 'testimonials', id));
}

// Timeline Events
export async function getTimelineEvents(year?: number): Promise<TimelineEvent[]> {
  const constraints: QueryConstraint[] = [
    orderBy('year', 'desc'),
    orderBy('month', 'desc'),
  ];
  if (year) {
    constraints.push(where('year', '==', year));
  }
  const q = query(collection(db, 'timeline_events'), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as TimelineEvent[];
}

export async function createTimelineEvent(event: Omit<TimelineEvent, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'timeline_events'), {
    ...event,
    createdAt: Timestamp.fromDate(new Date()),
  });
  return docRef.id;
}

export async function updateTimelineEvent(id: string, event: Partial<TimelineEvent>): Promise<void> {
  await updateDoc(doc(db, 'timeline_events', id), event);
}

export async function deleteTimelineEvent(id: string): Promise<void> {
  await deleteDoc(doc(db, 'timeline_events', id));
}

// Subscribers
export async function getSubscribers(activeOnly: boolean = true): Promise<Subscriber[]> {
  const constraints: QueryConstraint[] = [orderBy('subscribedAt', 'desc')];
  if (activeOnly) {
    constraints.push(where('active', '==', true));
  }
  const q = query(collection(db, 'subscribers'), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Subscriber[];
}

export async function createSubscriber(email: string): Promise<string> {
  const docRef = await addDoc(collection(db, 'subscribers'), {
    email,
    subscribedAt: Timestamp.fromDate(new Date()),
    active: true,
  });
  return docRef.id;
}

export async function unsubscribe(email: string): Promise<void> {
  const q = query(collection(db, 'subscribers'), where('email', '==', email), limit(1));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    await updateDoc(snapshot.docs[0].ref, { active: false });
  }
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  const q = query(collection(db, 'team_members'), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as TeamMember[];
}

export async function createTeamMember(member: Omit<TeamMember, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'team_members'), member);
  return docRef.id;
}

export async function updateTeamMember(id: string, member: Partial<TeamMember>): Promise<void> {
  await updateDoc(doc(db, 'team_members', id), member);
}

export async function deleteTeamMember(id: string): Promise<void> {
  await deleteDoc(doc(db, 'team_members', id));
}

// Transparency Sheets
export async function getTransparencySheets(category?: string): Promise<TransparencySheet[]> {
  const constraints: QueryConstraint[] = [orderBy('order', 'asc')];
  if (category) {
    constraints.push(where('category', '==', category));
  }
  const q = query(collection(db, 'transparency_sheets'), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as TransparencySheet[];
}

