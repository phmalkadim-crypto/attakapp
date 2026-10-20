import React, { useState, useEffect } from 'react';
import {
  Auction,
  Category,
  User,
  AppNotification,
} from './types';
import { store } from './services/store';
import { MobileAppContainer } from './components/mobile/MobileAppContainer';
import { MobileBottomNav, MobileTab } from './components/mobile/MobileBottomNav';
import { SplashScreen } from './components/mobile/SplashScreen';
import { MobileHomeScreen } from './components/mobile/MobileHomeScreen';
import { SupportScreen } from './components/mobile/SupportScreen';
import { AddAuctionScreen } from './components/mobile/AddAuctionScreen';
import { AuctionDetailsScreen } from './components/mobile/AuctionDetailsScreen';
import { PlaceBidScreen } from './components/mobile/PlaceBidScreen';
import { AuctionEndedScreen } from './components/mobile/AuctionEndedScreen';
import { ZainCashScreen } from './components/mobile/ZainCashScreen';
import { CommissionPaidScreen } from './components/mobile/CommissionPaidScreen';
import { ProfileScreen } from './components/mobile/ProfileScreen';
import { SellerDashboardScreen } from './components/mobile/SellerDashboardScreen';
import { TraderDashboardScreen } from './components/mobile/TraderDashboardScreen';
import { NotificationsScreen } from './components/mobile/NotificationsScreen';
import { AdminPanelScreen } from './components/mobile/AdminPanelScreen';
import { AuthModal } from './components/AuthModal';
import { RatingModal } from './components/RatingModal';
import { WelcomeSplashScreen } from './components/mobile/WelcomeSplashScreen';
import { AuthScreen } from './components/mobile/AuthScreen';

type AppScreen =
  | 'welcome_splash'
  | 'auth'
  | 'splash'
  | 'main'
  | 'auction_details'
  | 'place_bid'
  | 'auction_ended'
  | 'zaincash'
  | 'commission_paid'
  | 'seller_dashboard'
  | 'trader_dashboard'
  | 'notifications'
  | 'admin_panel';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(() => store.getCurrentUser());
  const [allUsers, setAllUsers] = useState<User[]>(() => store.getUsers());
  const [categories, setCategories] = useState<Category[]>(() => store.getCategories());
  const [auctions, setAuctions] = useState<Auction[]>(() => store.getAuctions());
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    store.getNotifications()
  );

  // App navigation state: Starts with 3-second Welcome Splash Screen
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome_splash');
  const [activeTab, setActiveTab] = useState<MobileTab>('home');

  // Active items for sub-screens
  const [activeAuction, setActiveAuction] = useState<Auction | null>(() => {
    return auctions[0] || null;
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Auth / Rating Modal
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [showRatingModal, setShowRatingModal] = useState(false);

  // Dark Mode state with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('attak_dark_mode') || localStorage.getItem('qotiyti_dark_mode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('attak_dark_mode', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const refreshState = () => {
    setCurrentUser(store.getCurrentUser());
    setAllUsers(store.getUsers());
    setCategories(store.getCategories());
    setAuctions(store.getAuctions());
    setNotifications(store.getNotifications());
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setAuctions(store.getAuctions());
      setNotifications(store.getNotifications());
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const pendingDealsCount = auctions.filter(
    (a) => a.winnerId === currentUser.id && a.status === 'WAITING_FOR_COMMISSION'
  ).length;

  // Handlers
  const handleOpenAuction = (auction: Auction) => {
    setActiveAuction(auction);
    if (auction.status === 'WAITING_FOR_COMMISSION' && auction.winnerId === currentUser.id) {
      setCurrentScreen('auction_ended');
    } else if (
      (auction.status === 'COMMISSION_PAID' || auction.status === 'COMPLETED') &&
      auction.winnerId === currentUser.id
    ) {
      setCurrentScreen('commission_paid');
    } else {
      setCurrentScreen('auction_details');
    }
  };

  return (
    <MobileAppContainer
      currentUser={currentUser}
      allUsers={allUsers}
      onSwitchUser={(user) => {
        store.setCurrentUser(user);
        setCurrentUser(user);
      }}
      isDarkMode={isDarkMode}
    >
      {/* ---------------- 0. WELCOME SPLASH SCREEN (3 seconds full-screen with fade-in text & fade-out) ---------------- */}
      {currentScreen === 'welcome_splash' && (
        <WelcomeSplashScreen
          onComplete={() => setCurrentScreen('auth')}
        />
      )}

      {/* ---------------- 1. AUTH SCREEN (Dedicated Full-Screen Login & Register with Toggle) ---------------- */}
      {(currentScreen === 'auth' || currentScreen === 'splash') && (
        <AuthScreen
          initialMode={authInitialMode}
          onAuthSuccess={(user) => {
            setCurrentUser(user);
            refreshState();
            setCurrentScreen('main');
          }}
        />
      )}

      {/* ---------------- 2. MAIN BOTTOM-NAV CONTAINER ---------------- */}
      {currentScreen === 'main' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Tab 1: الرئيسية (Screen 2 in image) */}
          {activeTab === 'home' && (
            <MobileHomeScreen
              categories={categories}
              auctions={auctions}
              currentUser={currentUser}
              unreadCount={unreadCount}
              onOpenNotifications={() => setCurrentScreen('notifications')}
              onEnterAuction={handleOpenAuction}
              onRefresh={refreshState}
              onAddNewAuction={() => setActiveTab('add')}
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
          )}

          {/* Tab 4: قسم الدعم (مركز الدعم والمساعدة المباشر) */}
          {activeTab === 'support' && (
            <SupportScreen
              currentUser={currentUser}
              onBack={() => setActiveTab('home')}
              isDarkMode={isDarkMode}
            />
          )}

          {/* Tab 3: أضف مزاد (Screen 4 in image) */}
          {activeTab === 'add' && (
            <AddAuctionScreen
              currentUser={currentUser}
              categories={categories}
              onBack={() => setActiveTab('home')}
              onAuctionCreated={(newAuction) => {
                refreshState();
                handleOpenAuction(newAuction);
              }}
            />
          )}

          {/* Tab 4: صفقاتي (Screens 11 & 12 in image) */}
          {activeTab === 'deals' && (
            <TraderDashboardScreen
              currentUser={currentUser}
              auctions={auctions}
              onBack={() => setActiveTab('home')}
              onSelectAuction={handleOpenAuction}
              onPayCommission={(auc) => {
                setActiveAuction(auc);
                setCurrentScreen('zaincash');
              }}
            />
          )}

          {/* Tab 5: حسابي (Screen 10 in image) */}
          {activeTab === 'profile' && (
            <ProfileScreen
              currentUser={currentUser}
              onBack={() => setActiveTab('home')}
              onOpenSellerDashboard={() => setCurrentScreen('seller_dashboard')}
              onOpenTraderDashboard={() => setCurrentScreen('trader_dashboard')}
              onOpenNotifications={() => setCurrentScreen('notifications')}
              onOpenAdmin={() => setCurrentScreen('admin_panel')}
              onSwitchUserPrompt={() => {
                setAuthInitialMode('login');
                setCurrentScreen('auth');
              }}
              onLogout={() => setCurrentScreen('auth')}
            />
          )}

          {/* Fixed Bottom Navigation */}
          <MobileBottomNav
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
            }}
            pendingDealsBadge={pendingDealsCount}
            isDarkMode={isDarkMode}
          />
        </div>
      )}

      {/* ---------------- 3. AUCTION DETAILS SCREEN (Screen 5 in image) ---------------- */}
      {currentScreen === 'auction_details' && activeAuction && (
        <AuctionDetailsScreen
          auction={activeAuction}
          currentUser={currentUser}
          onBack={() => setCurrentScreen('main')}
          onOpenBid={() => setCurrentScreen('place_bid')}
          onOpenEndedOrZainCash={() => {
            if (activeAuction.status === 'COMMISSION_PAID') {
              setCurrentScreen('commission_paid');
            } else {
              setCurrentScreen('auction_ended');
            }
          }}
        />
      )}

      {/* ---------------- 4. PLACE BID SCREEN (Screen 6 in image) ---------------- */}
      {currentScreen === 'place_bid' && activeAuction && (
        <PlaceBidScreen
          auction={activeAuction}
          currentUser={currentUser}
          onBack={() => setCurrentScreen('auction_details')}
          onBidSuccess={(updated) => {
            refreshState();
            setActiveAuction(updated);
            setCurrentScreen('auction_details');
          }}
        />
      )}

      {/* ---------------- 5. AUCTION ENDED / WINNER SCREEN (Screen 7 in image) ---------------- */}
      {currentScreen === 'auction_ended' && activeAuction && (
        <AuctionEndedScreen
          auction={activeAuction}
          onBack={() => setCurrentScreen('main')}
          onPayCommission={() => setCurrentScreen('zaincash')}
        />
      )}

      {/* ---------------- 6. ZAINCASH PAYMENT SCREEN (Screen 8 in image) ---------------- */}
      {currentScreen === 'zaincash' && activeAuction && (
        <ZainCashScreen
          auction={activeAuction}
          currentUser={currentUser}
          onBack={() => setCurrentScreen('auction_ended')}
          onPaymentSuccess={(updated) => {
            refreshState();
            setActiveAuction(updated);
            setCurrentScreen('commission_paid');
          }}
        />
      )}

      {/* ---------------- 7. COMMISSION PAID & UNLOCKED CONTACT (Screen 9 in image) ---------------- */}
      {currentScreen === 'commission_paid' && activeAuction && (
        <CommissionPaidScreen
          auction={activeAuction}
          onDone={() => {
            setActiveTab('deals');
            setCurrentScreen('main');
          }}
          onOpenRating={() => setShowRatingModal(true)}
        />
      )}

      {/* ---------------- 8. SELLER DASHBOARD (Screen 11 in image) ---------------- */}
      {currentScreen === 'seller_dashboard' && (
        <SellerDashboardScreen
          currentUser={currentUser}
          auctions={auctions}
          onBack={() => setCurrentScreen('main')}
          onSelectAuction={handleOpenAuction}
        />
      )}

      {/* ---------------- 9. TRADER DASHBOARD (Screen 12 in image) ---------------- */}
      {currentScreen === 'trader_dashboard' && (
        <TraderDashboardScreen
          currentUser={currentUser}
          auctions={auctions}
          onBack={() => setCurrentScreen('main')}
          onSelectAuction={handleOpenAuction}
          onPayCommission={(auc) => {
            setActiveAuction(auc);
            setCurrentScreen('zaincash');
          }}
        />
      )}

      {/* ---------------- 10. NOTIFICATIONS SCREEN (Screen 13 in image) ---------------- */}
      {currentScreen === 'notifications' && (
        <NotificationsScreen
          notifications={notifications}
          onBack={() => setCurrentScreen('main')}
          onSelectAuction={(auctionId) => {
            const auc = store.getAuctionById(auctionId);
            if (auc) handleOpenAuction(auc);
          }}
          isDarkMode={isDarkMode}
        />
      )}

      {/* ---------------- 11. ADMIN PANEL SCREEN (Screen 14 in image) ---------------- */}
      {currentScreen === 'admin_panel' && (
        <AdminPanelScreen
          onBack={() => setCurrentScreen('main')}
          onRefreshData={refreshState}
        />
      )}

      {/* ---------------- MODALS ---------------- */}
      {showAuthModal && (
        <AuthModal
          initialMode={authInitialMode}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={(user) => {
            setCurrentUser(user);
            setShowAuthModal(false);
            refreshState();
            setCurrentScreen('main');
          }}
        />
      )}

      {showRatingModal && activeAuction && (
        <RatingModal
          auction={activeAuction}
          currentUser={currentUser}
          onClose={() => setShowRatingModal(false)}
          onRatingSubmitted={() => refreshState()}
        />
      )}
    </MobileAppContainer>
  );
}
