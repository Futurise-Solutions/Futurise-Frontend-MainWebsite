import React from "react";
import { Box, SimpleGrid, Heading, Text, HStack, VStack, Tag, Image, Icon, Link as CLink, Flex } from "@chakra-ui/react";
import { FaLinkedinIn } from "react-icons/fa6";
import { Section, SectionHeading, Reveal } from "../common";
import { team, publishedTeam, isTeamPublished, initialsOf } from "../../utils/Constant/team";

/**
 * TeamSection — the named humans behind the work.
 *
 * Rendering rules (see src/utils/Constant/team.js for the full rationale):
 *   - Production: renders only when `TEAM_PUBLISHED` is true AND at least one member has
 *     real details. Placeholder members are never shown to visitors.
 *   - Development: always renders, using placeholders where real data is missing, so the
 *     layout can be reviewed before the real names and photos land.
 *
 * To go live: fill in src/utils/Constant/team.js, drop `placeholder: true`, set
 * `TEAM_PUBLISHED = true`. No change is needed in this file.
 */

// Note on image sizing: Chakra treats `width`/`height` as style props, so the intrinsic
// -size attributes the browser needs to reserve space must be passed as `htmlWidth` /
// `htmlHeight`. Using the style props alone leaves the layout shifting on load.
const Avatar = ({ member }) => {
  const [failed, setFailed] = React.useState(false);
  const showPhoto = member.image && !member.placeholder && !failed;

  return (
    <Box
      position="relative"
      w="88px"
      h="88px"
      borderRadius="full"
      overflow="hidden"
      flexShrink={0}
      border="1px solid"
      borderColor="rgba(180,160,255,0.3)"
      bgGradient="linear(135deg, rgba(123,108,255,0.25), rgba(181,123,255,0.25))"
    >
      {showPhoto ? (
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role} at Futurise Solutions`}
          w="88px"
          h="88px"
          htmlWidth="88"
          htmlHeight="88"
          loading="lazy"
          decoding="async"
          objectFit="cover"
          // A missing photo must degrade to initials, not a broken-image icon on the
          // page whose entire job is looking credible.
          onError={() => setFailed(true)}
        />
      ) : (
        <Flex w="full" h="full" align="center" justify="center">
          <Text fontSize="26px" fontWeight={700} color="accent.solid" letterSpacing="0.02em">
            {initialsOf(member.name) || "FS"}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

const TeamCard = ({ member }) => (
  <VStack
    align="start"
    spacing={4}
    p={{ base: 6, md: 7 }}
    h="full"
    borderRadius="20px"
    border="1px solid"
    borderColor="border.subtle"
    bg="rgba(13,13,22,0.55)"
    transition="all .25s"
    _hover={{ borderColor: "rgba(180,160,255,0.35)", transform: "translateY(-3px)" }}
  >
    <HStack spacing={4} align="center">
      <Avatar member={member} />
      <Box minW={0}>
        <Heading as="h3" fontSize="18px" fontWeight={700} color="text.primary" lineHeight={1.3}>
          {member.name}
        </Heading>
        <Text fontSize="14px" color="accent.solid" fontWeight={600} mt={1}>
          {member.role}
        </Text>
      </Box>
    </HStack>

    <Text fontSize="14px" color="text.muted" lineHeight={1.7}>
      {member.bio}
    </Text>

    <HStack spacing={2} flexWrap="wrap" mt="auto">
      {member.expertise.map((skill) => (
        <Tag key={skill} size="sm" bg="rgba(180,160,255,0.1)" color="text.muted" borderRadius="full" px={3} py={1} fontSize="12px">
          {skill}
        </Tag>
      ))}
    </HStack>

    {member.linkedin && (
      <CLink
        href={member.linkedin}
        isExternal
        aria-label={`${member.name} on LinkedIn`}
        display="inline-flex"
        alignItems="center"
        gap={2}
        fontSize="13px"
        color="text.faint"
        _hover={{ color: "accent.solid" }}
        transition="color .2s"
      >
        <Icon as={FaLinkedinIn} /> LinkedIn
      </CLink>
    )}
  </VStack>
);

const TeamSection = () => {
  const live = isTeamPublished();
  // import.meta.env.DEV is statically replaced at build time, so the placeholder branch
  // is tree-shaken out of the production bundle entirely.
  const previewing = !live && import.meta.env.DEV;
  if (!live && !previewing) return null;

  const members = live ? publishedTeam : team;

  return (
    <Section>
      {previewing && (
        <Box
          mb={8}
          p={4}
          borderRadius="12px"
          border="1px dashed"
          borderColor="orange.400"
          bg="rgba(255,165,0,0.07)"
        >
          <Text fontSize="sm" color="orange.200">
            <strong>Development preview only.</strong> This section is hidden in production.
            Fill in <code>src/utils/Constant/team.js</code>, remove <code>placeholder: true</code>,
            then set <code>TEAM_PUBLISHED = true</code> to publish it.
          </Text>
        </Box>
      )}

      <SectionHeading
        eyebrow="The team"
        title="The people who"
        highlight="build your product"
        subtitle="You work directly with the people writing the code and designing the screens — no account managers relaying messages between you and the build."
      />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={{ base: 10, md: 14 }}>
        {members.map((member, i) => (
          <Reveal key={member.id} delay={0.06 * i} h="full">
            <TeamCard member={member} />
          </Reveal>
        ))}
      </SimpleGrid>
    </Section>
  );
};

export default TeamSection;
