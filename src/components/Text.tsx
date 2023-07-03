export const Text = ({
    title,
    text,
    color,
    size,
    suffix,
}: {
    title: string,
    text: string,
    color?: string,
    size?: string,
    suffix?: string
}): JSX.Element => {
    const hasText = text !== "";
    const styles = { color: color || "" };
    return (<p className={size ? "global__font-small" : ""}>
        {title}
        {hasText && <>
            : <strong style={styles}><span className="global__font-nowrap">{text} {suffix || "kr/mån"}</span></strong>
        </>}
    </p>)
};