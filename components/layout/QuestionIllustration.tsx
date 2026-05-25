interface Props {
  questionNumber: number; // 1–8
}

function IllustrationInner({ n }: { n: number }) {
  switch (n) {
    case 1:
      return (
        <div className="qa-1">
          <div className="qa-row" />
          <div className="qa-row" />
          <div className="qa-dot" />
        </div>
      );
    case 2:
      return (
        <div className="qa-2">
          <div className="qa-line" />
          <div className="qa-line" />
          <div className="qa-line" />
          <div className="qa-x" />
        </div>
      );
    case 3:
      return (
        <div className="qa-3">
          <div className="qa-paper" />
          <div className="qa-box" />
        </div>
      );
    case 4:
      return (
        <div className="qa-4">
          <div className="qa-bar" />
          <div className="qa-arm" />
          <div className="qa-plate l" />
          <div className="qa-plate r" />
        </div>
      );
    case 5:
      return (
        <div className="qa-5">
          <div className="qa-phone" />
          <div className="qa-notif" />
        </div>
      );
    case 6:
      return (
        <div className="qa-6">
          <div className="qa-label">3%</div>
          <div className="qa-pct">
            <div className="qa-fill" />
          </div>
        </div>
      );
    case 7:
      return (
        <div className="qa-7">
          <div className="qa-line" />
          <div className="qa-line" />
          <div className="qa-line" />
          <div className="qa-line" />
          <div className="qa-node c" />
          <div className="qa-node a" />
          <div className="qa-node b" />
          <div className="qa-node d" />
          <div className="qa-node e" />
        </div>
      );
    case 8:
      return (
        <div className="qa-8">
          <div className="qa-col" />
          <div className="qa-col" />
          <div className="qa-col" />
          <div className="qa-col" />
          <div className="qa-base" />
        </div>
      );
    default:
      return null;
  }
}

export default function QuestionIllustration({ questionNumber }: Props) {
  return (
    <div
      className="mx-5 shrink-0 overflow-hidden"
      style={{
        height: '130px',
        borderRadius: '10px',
        background: '#d4cecd',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IllustrationInner n={questionNumber} />
      </div>
    </div>
  );
}
