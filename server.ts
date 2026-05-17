import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Supabase Client Initialization (Lazy)
  const getSupabase = () => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY are missing. Please set them in AI Studio Settings.');
    }
    return createClient(url, key);
  };

  // API Route for Consultation Request
  app.post('/api/consultation', async (req, res) => {
    const { name, phone, type, details } = req.body;
    console.log('Received consultation request:', { name, phone, type, details });
    
    try {
      const supabase = getSupabase();
      
      // Save to 'consultations' table
      const { error } = await supabase
        .from('consultations')
        .insert([
          { 
            name, 
            phone, 
            category: type, 
            details: details || 'Landing page quick apply',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Supabase Error:', error);
        return res.status(500).json({ success: false, message: 'DB 저장 중 오류가 발생했습니다.', error: error.message });
      }

      res.json({ success: true, message: '상담 신청이 완료되었습니다. 1시간 이내로 연락드리겠습니다!' });
    } catch (error: any) {
      console.error('Server Internal Error:', error.message);
      res.status(500).json({ 
        success: false, 
        message: '서버 설정 오류입니다. 관리자 메뉴에서 Supabase 설정을 확인해주세요.',
        error: error.message 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
