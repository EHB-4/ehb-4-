import { renderHook, act } from '@testing-library/react-hooks';
import { useComplaintEscalation } from '../../../app/hooks/useComplaintEscalation';

beforeEach(() => {
  fetch.resetMocks();
});

describe('useComplaintEscalation', () => {
  it('should escalate complaint and set result', async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: true, triageResult: { aiComment: 'Escalated' }, newStatus: 'escalated' }));
    const { result } = renderHook(() => useComplaintEscalation());
    await act(async () => {
      const data = await result.current.escalateComplaint({ complaintId: 'abc123' });
      expect(data.success).toBe(true);
      expect(result.current.result.triageResult.aiComment).toBe('Escalated');
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it('should set error on API failure', async () => {
    fetch.mockResponseOnce(JSON.stringify({ error: 'Failed' }), { status: 500 });
    const { result } = renderHook(() => useComplaintEscalation());
    await act(async () => {
      const data = await result.current.escalateComplaint({ complaintId: 'abc123' });
      expect(data).toBe(null);
      expect(result.current.error).toBe('Failed');
      expect(result.current.loading).toBe(false);
    });
  });
}); 