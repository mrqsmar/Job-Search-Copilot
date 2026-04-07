function SkillTag({ label, variant = "default" }) {
  return <span className={`skill-tag skill-tag--${variant}`}>{label}</span>;
}

export default SkillTag;
