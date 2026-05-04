import { useEffect } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { Header } from '../components/layout/Header';
import { ThreePaneLayout } from '../components/layout/ThreePaneLayout';
import { Toast } from '../components/common/Toast';
import { AddressCard } from '../components/mailbox/AddressCard';
import { Card } from '../components/common/Card';
import { RecentAddresses } from '../components/mailbox/RecentAddresses';
import { InboxToolbar } from '../components/mailbox/InboxToolbar';
import { InboxList } from '../components/mailbox/InboxList';
import { MessageDetail } from '../components/mailbox/MessageDetail';
import { useClipboard } from '../hooks/useClipboard';
import { useInboxPolling } from '../hooks/useInboxPolling';
import { useTempMail } from '../hooks/useTempMail';
import { useTheme } from '../hooks/useTheme';
import { useToast } from '../hooks/useToast';

export function HomePage() {
  const theme = useTheme();
  const toast = useToast();
  const clipboard = useClipboard();
  const temp = useTempMail();

  useEffect(() => {
    void temp.initializeApp();
  }, []);

  useInboxPolling(temp.currentAddress, temp.refreshInbox);

  return <AppShell><Header onToggleTheme={theme.toggleTheme} /><ThreePaneLayout
    left={<><AddressCard address={temp.currentAddress} loading={temp.addressLoading} error={temp.addressError} meta={temp.addressMeta} onCopy={async () => { if (temp.currentAddress && await clipboard.copy(temp.currentAddress)) toast.addToast('\u0110\u00E3 sao ch\u00E9p \u0111\u1ECBa ch\u1EC9', 'success'); }} onRandom={async () => { const res = await temp.createRandomAddress(); if (res) toast.addToast('\u0110\u00E3 t\u1EA1o \u0111\u1ECBa ch\u1EC9 ng\u1EABu nhi\u00EAn', 'success'); else toast.addToast('Kh\u00F4ng th\u1EC3 t\u1EA1o \u0111\u1ECBa ch\u1EC9', 'error'); }} onRefresh={() => void temp.refreshInbox()} /><Card><p className="text-xs text-slate-400">{"\u2139\uFE0F T\u1EA1o \u0111\u1ECBa ch\u1EC9 t\u00F9y ch\u1EC9nh \u0111ang t\u1EA1m t\u1EAFt v\u00EC API provider hi\u1EC7n ch\u01B0a h\u1ED7 tr\u1EE3 endpoint n\u00E0y. Vui l\u00F2ng d\u00F9ng T\u1EA1o ng\u1EABu nhi\u00EAn."}</p></Card><RecentAddresses items={temp.recent.items} onUse={(address) => void temp.setCurrentAddressFromRecent(address)} onRemove={temp.recent.remove} onClear={temp.recent.clear} /></>}
    middle={<><InboxToolbar count={temp.inboxMessages.length} loading={temp.inboxLoading} lastRefreshedAt={temp.lastRefreshedAt} onRefresh={() => void temp.refreshInbox()} /><InboxList currentAddress={temp.currentAddress} messages={temp.inboxMessages} loading={temp.inboxLoading} error={temp.inboxError} selectedId={temp.selectedMessageId} readMap={temp.readStatusMap} onSelect={(id) => void temp.loadMessage(temp.currentAddress, id)} onRetry={() => void temp.refreshInbox()} /></>}
    right={<MessageDetail message={temp.selectedMessageDetail} loading={temp.messageLoading} error={temp.messageError} onRetry={() => temp.selectedMessageId && void temp.loadMessage(temp.currentAddress, temp.selectedMessageId)} onCopy={async (content) => { if (content && await clipboard.copy(content)) toast.addToast('\u0110\u00E3 sao ch\u00E9p n\u1ED9i dung', 'success'); }} />}
  />
  <Toast items={toast.toasts} onClose={toast.removeToast} />
  </AppShell>;
}
