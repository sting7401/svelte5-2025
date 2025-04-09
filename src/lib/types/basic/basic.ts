import { z } from 'zod';

// Zod 스키마 정의
export const NotificationItems = z.object({
	id: z.string(),
	title: z.string(),
	body: z.string(),
	date: z.string(),
});

// 스키마에서 타입 추출
export type NotificationItemType = z.infer<typeof NotificationItems>;

const NotificationItemType = (Notification: NotificationItemType) => {
	NotificationItems.parse(Notification); // 유효성 검증
	// 사용자 처리 로직
};

// export interface NotificationItems {
// 	id: string;
// 	title: string;
// 	body: string;
// 	date: string;
// }
