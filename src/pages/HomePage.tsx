import { useCallback, useEffect } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { Header } from '../components/layout/Header';
import { ThreePaneLayout } from '../components/layout/ThreePaneLayout';
import { Toast } from '../components/common/Toast';
import { AddressCard } from '../components/mailbox/AddressCard';
import { CustomAddressForm } from '../components/mailbox/CustomAddressForm';
import { RecentAddresses } from '../components/mailbox/RecentAddresses';
import { InboxToolbar } from '../components/mailbox/InboxToolbar';
import { InboxList } from '../components/mailbox/InboxList';
import { MessageDetail } from '../components/mailbox/MessageDetail';
import { CheckAddressForm } from '../components/mailbox/CheckAddressForm';
import { QuickOtpBar } from '../components/mailbox/QuickOtpBar';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInboxPolling(temp.currentAddress, temp.refreshInbox);

  const copyOtp = useCallback(
    async (otp: string) => {
      if (!otp) return false;
      const ok = await clipboard.copy(otp);
      if (ok) {
        toast.addToast(`Đã sao chép OTP: ${otp}`, 'success');
      } else {
        toast.addToast('Không thể sao chép OTP', 'error');
      }
      return ok;
    },
    [clipboard, toast],
  );

  const copyAddress = useCallback(async () => {
    if (!temp.currentAddress) return;
    const ok = await clipboard.copy(temp.currentAddress);
    if (ok) toast.addToast('Đã sao chép địa chỉ', 'success');
    else toast.addToast('Không thể sao chép địa chỉ', 'error');
  }, [clipboard, temp.currentAddress, toast]);

  const handleCustomSubmit = async (username: string, domain: string) => {
    const address = `${username}@${domain}`;
    await temp.setCurrentAddressLocal(address);
    toast.addToast('Đã tạo địa chỉ tùy chỉnh', 'success');
  };

  const handleCheckAddress = (address: string) => {
    void temp.setCurrentAddressLocal(address);
    toast.addToast('Đã mở inbox cho địa chỉ này', 'success');
  };

  return (
    <AppShell>
      <Header
        theme={theme.theme}
        onToggleTheme={theme.toggleTheme}
        polling={temp.inboxLoading}
        lastRefreshedAt={temp.lastRefreshedAt}
      />
      <ThreePaneLayout
        left={
          <>
            <AddressCard
              address={temp.currentAddress}
              loading={temp.addressLoading}
              error={temp.addressError}
              meta={temp.addressMeta}
              onCopy={copyAddress}
              onRandom={async () => {
                const res = await temp.createRandomAddress();
                if (res) toast.addToast('Đã tạo địa chỉ ngẫu nhiên', 'success');
                else toast.addToast('Không thể tạo địa chỉ', 'error');
              }}
              onRefresh={() => void temp.refreshInbox()}
            />
            <CustomAddressForm
              domains={temp.domains}
              selectedDomain={temp.selectedDomain}
              loading={temp.addressLoading}
              domainsLoading={temp.domainsLoading}
              domainsError={temp.domainsError}
              onRetryDomains={() => void temp.loadDomains()}
              onSelectDomain={temp.setSelectedDomain}
              onSubmit={handleCustomSubmit}
            />
            <CheckAddressForm onCheck={handleCheckAddress} />
            <RecentAddresses
              items={temp.recent.items}
              onUse={(address) => void temp.setCurrentAddressFromRecent(address)}
              onRemove={temp.recent.remove}
              onClear={temp.recent.clear}
            />
          </>
        }
        middle={
          <>
            <QuickOtpBar
              messages={temp.inboxMessages}
              onCopyOtp={copyOtp}
              onOpenMessage={(id) => void temp.loadMessage(temp.currentAddress, id)}
            />
            <InboxToolbar
              count={temp.inboxMessages.length}
              loading={temp.inboxLoading}
              lastRefreshedAt={temp.lastRefreshedAt}
              onRefresh={() => void temp.refreshInbox()}
            />
            <InboxList
              currentAddress={temp.currentAddress}
              messages={temp.inboxMessages}
              loading={temp.inboxLoading}
              error={temp.inboxError}
              selectedId={temp.selectedMessageId}
              readMap={temp.readStatusMap}
              onSelect={(id) => void temp.loadMessage(temp.currentAddress, id)}
              onRetry={() => void temp.refreshInbox()}
              onCopyOtp={(otp) => void copyOtp(otp)}
            />
          </>
        }
        right={
          <MessageDetail
            message={temp.selectedMessageDetail}
            loading={temp.messageLoading}
            error={temp.messageError}
            onRetry={() =>
              temp.selectedMessageId &&
              void temp.loadMessage(temp.currentAddress, temp.selectedMessageId)
            }
            onCopyOtp={copyOtp}
          />
        }
      />
      <Toast items={toast.toasts} onClose={toast.removeToast} />
    </AppShell>
  );
}
