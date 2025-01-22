import Page from './page';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Page />
        </div>
    );
}