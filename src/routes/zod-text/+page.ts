import type { PageLoad } from './$types';
import { z } from 'zod';

// Zod 스키마 정의
const mySchema = z.object({
	name: z.string(),
	age: z.number().min(0),
	email: z.string().email(),
});

// 스키마에서 타입 추출
type MyData = z.infer<typeof mySchema>;

export const load: PageLoad = async () => {
	// 더미 데이터 생성
	const result: MyData = {
		name: 'John Doe',
		age: 30,
		email: 'john.doe@example.com',
	};

	// Zod를 사용하여 데이터 유효성 검사
	try {
		mySchema.parse(data);
		console.log('Data is valid!');
	} catch (error: any) {
		console.error('Validation error:', error.errors);
		// 유효성 검사 실패 시 처리
	}

	return { result };
};
